<template>
  <div style="height: 100%;width: 100%;display: flex;flex-direction: column;">
    <div style="flex-shrink: 0;">
      <el-row style="background-color: cadetblue;height: 60px;display: flex;flex-direction: row;align-items: center;">
        <el-col :span="12" style="display: flex;flex-direction: row;padding-left: 20px;">
          <div style="font-size: 20px;color: white;">230</div>
          <div style="font-size: 30px;color: white;">电力模拟工具</div>
        </el-col>
        <el-col :span="12">
          <el-button @click="handleStop" size="small">停止测试</el-button>
          <el-button size="small" @click="exportData">导出</el-button>
          <el-button @click="handleBack" size="small">返回</el-button>
          <el-button size="small" @click="clearRealData">清空数据</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" style="padding: 5px;">
        <el-col :space="22">
          <el-tag>测试列表：{{listNum}}</el-tag>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-refresh"></i>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-setting"></i>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 5px;flex-grow: 1;overflow-y: auto;">
      <el-card class="box-card" v-for="table of tables" style="margin-bottom: 5px;">
        <div slot="header" class="clearfix">
          <el-row>
            <el-tag size="mini">上报</el-tag>
            <el-tag size="mini">上报个数:{{table.numOfPktsPerTime}}</el-tag>
            <el-tag size="mini">{{testType == '0'?'招测间隔':'上报间隔'}}:{{table.intervalOfPerTime}}</el-tag>
            <el-tag size="mini">上报周期:{{table.intervalOfPerPkt}}</el-tag>
            <el-tag size="mini">端口号:{{table.portNum}}</el-tag>
            <el-tag size="mini">数据长度:{{table.dataLength}}</el-tag>
            <el-tag size="mini">{{testType == '0'?'招测长度':'主动上报长度'}}:{{table.callLength}}</el-tag>
            <el-tag size="mini">分批时延:{{table.batchDelay}}</el-tag>
            <el-tag size="mini">单批数量:{{table.batchNum}}</el-tag>
            <el-tag size="mini">终端数量:{{table.data.length}}</el-tag>
          </el-row>
        </div>
        <el-table :data="table.data" size="mini">
          <el-table-column label="终端IP" prop="ip" sortable></el-table-column>
          <el-table-column label="在线状态" prop="onlinestate" sortable></el-table-column>
          <el-table-column label="测试状态" prop="testStatus" sortable></el-table-column>
          <el-table-column label="应收包数" prop="pktReceivable" sortable></el-table-column>
          <el-table-column label="实收包数" prop="pktReceived" sortable></el-table-column>
          <el-table-column label="速度" prop="avgDelay" sortable></el-table-column>
          <el-table-column label="丢包数" prop="lastDelay" sortable></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import analogApi from '@/api/analog';
  import configApi from '@/api/config';

  export default {
    name: "Run",
    data() {
      return {
        listNum: 0,
        configs: [],
        tables: null,
        netRepeat: true,
        startState: true,
      }
    },
    watch: {
      tables: function () {
        var sum = 0;
        this.tables.forEach(table => {
          sum += table.data.length;
        })
        this.listNum = sum;
      }
    },
    created() {
      this.netRepeat = true;
      this.loadConfigs();
    },
    destroyed() {
      this.netRepeat = false;
    },
    methods: {
      exportData(){

      },
      clearRealData() {
        this.$confirm('你确定清空数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          configApi.clean()
            .then(response => {
              var ret = response.data;
              if (ret.flag) {
                this.$message({message: ret.message, type: 'success'});
              } else {
                this.$message.error(ret.message);
              }
            })
            .catch(error => {
              this.$message.error(error);
            })
        }).catch(() => {

        })
      },
      loadConfigs() {
        configApi.getall()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs = ret.data;
              this.refreshRealData();
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      refreshRealData() {
        analogApi.findRealData()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs.forEach(config => {
                config.data = [];
              });
              var realDatas = ret.data;
              realDatas.forEach(realData => {
                var ip = realData.ip;
                for (let i = 0; i < this.configs.length; i++) {
                  var keys = Object.keys(this.configs[i].ueList);
                  if (keys.includes(ip, 0)) {
                    this.configs[i].data.push(realData);
                    break;
                  }
                }
              })
              if (this.tables == null) {
                this.tables = this.configs;
              }
              if (this.netRepeat){
                setTimeout(() => {
                  this.refreshRealData();
                }, 1000)
              }
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      handleStop() {
        this.$confirm('你确定要停止测试吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          configApi.stoptest()
            .then(response => {
              var ret = response.data;
              if (ret.flag) {
                this.startState = false;
                this.$message({message: ret.message, type: 'success'});
              } else {
                this.$message.error(ret.message);
              }
            })
            .catch(error => {
              this.$message.error(error);
            })
        }).catch(() => {

        })
      },
      handleBack() {
        if (this.startState){
          this.$message.error("您尚未停止测试，无法返回！！")
          return;
        }
        this.$router.push({path: '/'});
      }
    }
  }
</script>

<style scoped>
  .top_head {
    background-color: cadetblue;
    padding: 10px;
  }
</style>
