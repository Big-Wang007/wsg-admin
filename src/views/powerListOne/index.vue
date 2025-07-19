<template>
  <RouterView />
</template>
<script setup>
function getTranslatedStrings(currentLanguage) {
  // switch (currentLanguage) {
  // 	case 'en':
  // 		return import('./foo.strings.en.js');
  // 	case 'de':
  // 		return import('./foo.strings.de.js');
  // 	// ...
  // }
  console.log(currentLanguage);
}
</script>
<style lang="less" scoped></style>
