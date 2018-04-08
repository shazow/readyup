<template>
  <div>Creating room...</div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    const roomId = 123
    this.$router.push({ name: 'room', params: { id: roomId }})
  },
}
</script>
