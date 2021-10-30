<template>
  <div class="ubu-toast-container">
    <div class="ubu-toast" :class="type && type">
      <span class="message" :class="{ action: action }">{{ text }}</span>
      <button v-if="action" @click="handler && handler()">{{ action }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ubu-toast-template',
  data: () => ({
    text: '',
    action: '',
    type: '',
    handler: () => ({}),
  }),
  methods: {
    init(options) {
      if (typeof options !== 'object') return (this.text = options)
      const { text, action, handler, type } = options
      this.text = text
      this.action = action
      this.handler = handler
      this.type = type
    },
  },
}
</script>

<style lang="scss" scoped>
.ubu-toast-area {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2000;
  transition: transform 0.4s, opacity 0.4s ease;

  &:hover {
    .ubu-toast-container {
      transform: translate3d(0, 0, 0) scale(1);
      &:nth-last-child(2) {
        transform: translate3d(0, -80px, 0) scale(1);
      }
      &:nth-last-child(3) {
        transform: translate3d(0, -160px, 0) scale(1);
      }
    }
  }
}
.ubu-toast-container {
  --ubu-bg: black;
  --ubu-fore: white;
  --ubu-success: #34d399;
  --ubu-warning: #fbbf24;
  --ubu-danger: #f87171;
  --ubu-error: #f87171;

  opacity: 0;
  transform: translate3d(0, 100%, 0) scale(1);
  transition: all 0.4s ease;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 90%;
  max-width: 90%;
  display: flex;
  justify-content: flex-end;
  &.visible {
    opacity: 1;
    transform: none;
  }
  &:nth-last-child(1) {
    z-index: 2004;
  }
  &:nth-last-child(2) {
    transform: translate3d(0, -14px, 0) scale(0.95);
    z-index: 2003;
  }
  &:nth-last-child(3) {
    transform: translate3d(0, -28px, 0) scale(0.9);
    z-index: 2002;
  }
  &:nth-last-child(4) {
    transform: translate3d(0, -36px, 0) scale(0.85);
    z-index: 2001;
  }
  &:nth-last-child(5) {
    transform: translate3d(0, -46px, 0) scale(0.8);
    z-index: 2000;
  }

  &:nth-last-child(n + 4) {
    visibility: hi;
  }
}
.ubu-toast {
  padding: 0.8rem 2rem;
  border-radius: 5px;
  border: 0;
  color: var(--ubu-fore);
  background-color: var(--ubu-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.12);
  font-size: 1rem;
  max-width: 100%;

  box-sizing: border-box;

  &.warning {
    background-color: var(--ubu-warning);
    color: var(--ubu-bg);
  }
  &.success {
    background-color: var(--ubu-success);
    color: var(--ubu-bg);
  }

  .zi-toast.error,
  .zi-toast.danger {
    background-color: var(--ubu-error);
    color: var(--ubu-bg);
  }

  .message {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    font-weight: 500;
    padding: 0;
    &.action {
      max-width: 70%;
    }
  }
}
</style>
