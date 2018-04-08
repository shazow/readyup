<template>
  <div>Creating room...</div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.$router.push({ name: 'room', params: { id: 123 }})
  },
}
</script>
