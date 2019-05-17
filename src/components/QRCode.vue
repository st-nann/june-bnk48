<template>
  <qr-canvas :options="options"></qr-canvas>
</template>

<script>
import { QRCanvas } from 'qrcanvas-vue'
 
export default {
  components: {
    QRCanvas
  },
  data() {
    return {
      options: {
        cellSize: 8,
        correctLevel: 'M',
        data: 'hello, world',
      },
    };
  },
  created() {
    const image = new Image();
    image.src = 'https://user-images.githubusercontent.com/3139113/38300650-ed2c25c4-382f-11e8-9792-d46987eb17d1.png';
    image.onload = () => {
      this.options = Object.assign({}, this.options, {
        logo: {
          image
        }
      })
    }
  }
}
</script>
