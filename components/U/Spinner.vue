<template>
  <div id="u-spinner" class="flex justify-center items-center">
    <div class="spinner rounded-full">
      <div class="spinner__progress"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#u-spinner {
  position: relative;

  $ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  $ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  $ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  $ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  $ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  $ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  $ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  $ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);

  --color-progress-background: rgba(239, 245, 226, 0.06);
  --color-progress-left: rgba(222, 235, 197, 0);
  --color-progress-middle: rgba(239, 245, 226, 0.37);
  --color-progress-right: #ffffff;
  --size-progress-v: 2px;
  --size-progress-h: 120px;
  --border-radius-progress: 2px;
  --blur-progress: 3px;
  --blur-opacity: 0.75;

  .spinner {
    position: relative;
    width: var(--size-progress-h);
    height: var(--size-progress-v);
    border-radius: var(--border-radius-progress);
    background: var(--color-progress-background);
  }

  .spinner__progress {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: var(--border-radius-progress);
    background: linear-gradient(
      to left,
      var(--color-progress-right) 0%,
      var(--color-progress-middle) 80%,
      var(--color-progress-left) 100%
    );

    &::before,
    &::after {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: var(--blur-opacity);
      filter: blur(var(--blur-progress));
      border-radius: var(--border-radius-progress);
      background: linear-gradient(
        to left,
        var(--color-progress-right) 0%,
        var(--color-progress-middle) 80%,
        var(--color-progress-left) 100%
      );
    }

    animation-name: animate;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes animate {
    0% {
      opacity: 0;
      transform-origin: left center;
      transform: scaleX(0) scaleY(0.5) translateX(0);
      animation-timing-function: $ease-in-cubic;
    }

    50% {
      opacity: 1;
      transform-origin: left center;
      transform: scaleX(0.5) scaleY(1) translateX(50%);
    }

    51% {
      opacity: 1;
      transform-origin: right center;
      transform: scaleX(0.5) scaleY(1) translateX(-50%);
      animation-timing-function: $ease-out-cubic;
    }

    100% {
      opacity: 0;
      transform-origin: right center;
      transform: scaleX(0) scaleY(0.5) translateX(0);
    }
  }
}
</style>
