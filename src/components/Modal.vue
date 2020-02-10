<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import axios from 'axios'

export default {
  name: 'modal',
  data () {
    return {
      loading: true,
      line: {
        xAxis: {
          type: 'time',
          interval: 1000 * 60 * 60 * 2
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            return date.toLocaleString() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        yAxis: {
          boundaryGap: [0, '100%']
        },
        series: [{
          name: 'Sales',
          showSymbol: false,
          type: 'line',
          data: []
        }]
      }
    }
  },
  components: {
    IEcharts
  },
  mounted () {
    axios.get('/static/data.json').then(res => {
      if (res && res.data && res.data.data) {
        res.data.data.forEach((d, index) => {
          let now = new Date(d.modifiedDate)
          this.line.series[0].data.push({
            name: now.toString(),
            value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + 'T' + [now.getHours()].join(':'), d.cpc]
          })
        })
        this.loading = false
      }
    })
  },
  methods: {
    close () {
      this.$emit('close')
    },
    onReady (instance, ECharts) {
    },
    onClick (event, instance, ECharts) {
    }
  }
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Line chart
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            &times;
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <div class="echarts">
          <IEcharts
            :option="line"
            :loading="loading"
            @ready="onReady"
            @click="onClick"
          />
        </div>
      </section>
       <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
.echarts {
  width: 100%;
  height: 60vh;
  position: relative;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 90%;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  align-items: center;
}

.modal-header {
  font-size: 24px;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
}

.btn-close {
  border: none;
  font-size: 30px;
  padding: 10px 20px;
  cursor: pointer;
  color: #4AAE9B;
  background: transparent;
  outline: none;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px 15px;
  outline: none;
}

.btn-green:hover {
  cursor: pointer;
  background: #6ec6b6;
}
</style>
