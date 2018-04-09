<template>
  <div>Creating room...</div>
</template>

<script>
function random_string(num, alphabet) {
    const charset = alphabet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let r = '';
    for (let i=num; i > 0; i--) {
        r += charset[~~(Math.random() * charset.length)];
    }
    return r;
}

export default {
  name: 'Index',
  mounted() {
    const roomId = random_string(8)
    this.$router.push({ name: 'room', params: { id: roomId }})
  },
}
</script>
