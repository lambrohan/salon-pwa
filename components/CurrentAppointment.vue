<template>
  <div
    id="current-appointment"
    class="rounded-lg mt-2 flex relative overflow-hidden z-2"
    :class="isOngoing ? 'bg-success' : 'bg-black28'"
    v-if="appointment"
  >
    <div
      class="progress absolute h-full w-full left-0 top-0"
      :style="`transform:translateX(${
        progressPercent < 100 ? progressPercent - 100 : 0
      }%)`"
    ></div>
    <div class="p-4 relative">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 0.00115967C5.82105 0.00115967 0 5.82107 0 13.0006C0 20.1801 5.82048 26 13 26C20.1801 26 26 20.1801 26 13.0006C26 5.82107 20.1801 0.00115967 13 0.00115967ZM13 3.88814C15.3755 3.88814 17.3004 5.81364 17.3004 8.18797C17.3004 10.5629 15.3755 12.4878 13 12.4878C10.6257 12.4878 8.70074 10.5629 8.70074 8.18797C8.70074 5.81364 10.6257 3.88814 13 3.88814ZM12.9971 22.6013C10.628 22.6013 8.45805 21.7384 6.78437 20.3103C6.37666 19.9626 6.1414 19.4526 6.1414 18.9176C6.1414 16.5095 8.09031 14.5823 10.4989 14.5823H15.5022C17.9114 14.5823 19.8529 16.5095 19.8529 18.9176C19.8529 19.4532 19.6188 19.962 19.2105 20.3097C17.5374 21.7384 15.3669 22.6013 12.9971 22.6013Z"
          fill="white"
        />
      </svg>
    </div>
    <div class="t text-white flex-grow py-4 px-2 relative">
      <h4 class="block mb-2 text-lg font-semibold">
        {{ appointment.user.phone_number }}
      </h4>
      <div class="services flex items-center flex-wrap">
        <span
          class="text-xs px-2 py-1 rounded-xl mr-2 mb-2"
          :style="`background: ${isOngoing ? '#3FA480' : '#4b4b4b'}`"
          v-for="s in appointment.services"
          :key="s"
        >
          {{ s }}
        </span>
        <span
          class="px-2 py-1 rounded-xl text-xs bg-white mb-2 mr-2"
          @click="addonServiceModal = true"
        >
          <img src="/icons/plus.svg" class="w-4" />
        </span>
        <span
          class="px-2 py-1 rounded-xl text-xs bg-white mb-2 mr-2"
          @click="$emit('onSelect')"
          v-if="appointment.status == 'created'"
        >
          <img src="/icons/settings.svg" class="w-4" />
        </span>
        <span
          class="px-2 py-1 rounded-xl text-xs bg-white flex items-center mb-2"
          @click="durationModal = true"
        >
          <img src="/icons/clock.svg" class="w-4" />
          <p class="text-xs font-semibold text-black ml-1">
            {{ $dayjs.duration(ongoingSecs * 1000).format('mm:ss') }}
          </p>
        </span>
      </div>
    </div>
    <div class="w-3/12 flex items-center justify-center relative">
      <div
        class="w-14 h-14 rounded-full bg-primary flex items-center justify-center actionbtn"
        :class="isOngoing ? 'ongoing' : ''"
        @click="onToggle"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="appointment.status == 'ongoing'"
        >
          <rect width="14" height="14" rx="2" fill="black" />
        </svg>

        <svg
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          v-else
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 7.26795C15.3333 8.03775 15.3333 9.96225 14 10.7321L3.5 16.7942C2.16667 17.564 0.500001 16.6018 0.500001 15.0622L0.500002 2.93782C0.500002 1.39822 2.16667 0.435971 3.5 1.20577L14 7.26795Z"
            fill="black"
          />
        </svg>
      </div>
    </div>

    <Modal v-model="durationModal" autodismiss>
      <AdjustDuration
        @onDurationConfirm="onDurationConfirm"
        :initialValue="appointment.approx_duration"
      />
    </Modal>
    <BottomSheet v-model="addonServiceModal" :minHeight="0">
      <QuickServiceSelector
        :salonId="appointment.salon.id"
        @next="addOnConfirm"
      />
    </BottomSheet>
  </div>
</template>

<script>
import Modal from './U/Modal.vue'
import AdjustDuration from './AdjustDuration.vue'
import QuickServiceSelector from './QuickServiceSelector.vue'
import BottomSheet from './U/BottomSheet.vue'
export default {
  name: 'CurrentAppointment',
  props: ['appointment'],
  data() {
    return {
      durationModal: false,
      addonServiceModal: false,
      ongoingSecs: 0,
      progressPercent: 0,
    }
  },
  mounted() {
    if (window.ongoingTimer) {
      clearInterval(window.ongoingTimer)
    }
    if (this.isOngoing) {
      window.ongoingTimer = setInterval(this.calcElapsedTime, 1000)
    }
  },
  methods: {
    onToggle() {
      switch (this.appointment.status) {
        case 'created':
          this.durationModal = true
          break
        case 'ongoing':
          this.finishAppointment()
        default:
          break
      }
    },

    async finishAppointment() {
      const dialog = this.$Dialog.show({
        message: this.$t('finish_appointment'),
        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),
      })

      dialog.positiveHandler = () => {
        this.$appointmentRepo.finish(this.appointment.id)
        dialog.dismiss()
      }
    },

    async addOnConfirm(services) {
      try {
        this.addonServiceModal = false
        await this.$appointmentRepo.addServices(this.appointment.id, services)
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
      }
    },
    async onDurationConfirm(duration) {
      this.durationModal = false
      if (this.isOngoing) {
        await this.$appointmentRepo.updateDuration(
          this.appointment.id,
          duration
        )
        return
      }

      try {
        await this.$appointmentRepo.startAppointment(
          this.appointment.id,
          parseInt(duration)
        )
      } catch (error) {
        if (error.response.data) {
          this.$Toast.danger(error.response.data.message)
        }
      }
    },

    calcElapsedTime() {
      this.ongoingSecs =
        this.$dayjs(this.appointment.started_at).diff(this.$dayjs(), 'second') *
        -1
      this.progressPercent = parseInt(
        (this.ongoingSecs * 100) / (this.appointment.approx_duration * 60)
      )
    },
  },

  components: { Modal, AdjustDuration, QuickServiceSelector, BottomSheet },
  computed: {
    isOngoing() {
      return this.appointment.status == 'ongoing'
    },
  },
  watch: {
    isOngoing() {
      if (!window.ongoingTimer) {
        window.ongoingTimer = setInterval(this.calcElapsedTime, 1000)
      }
    },
  },
  beforeDestroy() {
    if (window.ongoingTimer) {
      clearInterval(window.ongoingTimer)
    }
  },
}
</script>

<style lang="scss" scoped>
#current-appointment {
  .actionbtn {
    transition: 0.3s ease all;
    &:active {
      transform: scale(0.9);
    }
  }

  .progress {
    background: linear-gradient(-45deg, #209e72, #209e72, #23a6d5, #23d5ab);

    background-size: 400% 400%;

    transform: translateX(-100%);
    transition: 0.3s ease all;
    animation: shine 15s ease infinite;
  }

  .ongoing {
    position: relative;
    &:after {
      position: absolute;
      content: '';
      width: 130%;
      height: 130%;
      border-radius: 50%;
      border: 2px dashed rgba(255, 255, 255, 0.575);
      animation: spin 7s linear 0s infinite;
    }
  }

  @keyframes shine {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
