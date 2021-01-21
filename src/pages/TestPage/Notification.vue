<template>
<div class="alert"
    :class="{'alert-success': success, 'alert-danger': !success}"
    role="alert">
    {{ message }}
</div>
</template>

<script>
export default {
  props:[
    'success',
    'message'
  ]
}
</script>
