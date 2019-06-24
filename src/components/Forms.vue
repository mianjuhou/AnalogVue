<template>
  <div style="height: 100%;width: 100%;display: flex;flex-direction: column;">
    <div style="padding: 0px;flex-shrink: 0;">
      <el-row style="background-color: cadetblue;height: 60px;display: flex;flex-direction: row;align-items: center;">
        <el-col :span="10" style="display: flex;flex-direction: row;padding-left: 20px;">
          <div style="font-size: 20px;color: white;">230</div>
          <div style="font-size: 30px;color: white;">电力模拟工具</div>
        </el-col>
        <el-col :span="14">
          <el-button @click="handleStart" size="small">开始测试</el-button>
          <el-button size="small" @click="clearRealData">清空数据</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="flex-grow: 1;display: flex;">
      <el-container style="flex: 1;">
        <el-aside style="display: flex;">
          <div style="flex: 1;display: flex;flex-direction: column;padding: 5px;">
            <el-row style="flex-shrink: 0;margin: 5px;" type="flex" justify="middle">
              <el-col :span="14" style="display: flex;align-items: center;">
                <el-checkbox size="small" style="padding: 0px 20px 0px 10px;margin: 0px;" @change="handleCheckAll()"
                             v-model="checkAllState"></el-checkbox>
                <el-tag size="medium">UE列表:{{ueNum}}</el-tag>
              </el-col>
              <el-col :span="10" style="display: flex;flex-direction: row-reverse;">
                <el-select v-model="stationId" placeholder="请选择" style="width: 110px;" size="small">
                  <el-option
                    v-for="item in stations"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-card style="flex-grow: 1;overflow: auto;">
              <el-row v-for="(item,index) of ueList" :key="item.imsi">
                <el-col :span="2" style="text-align: center;">
                  <div style="min-width: 5px;">
                    <el-checkbox key="cb" size="small" :class="item.used?'checkbox_invis':'checkbox_vis'"
                                 @change="handleUeCheck(item)" v-model="item.checked" true-label="true"></el-checkbox>
                  </div>
                </el-col>
                <el-col :span="11" style="text-align: center;">
                  <span style="font-size: 12px;" :class="item.onlinestate==1?'online-color':'offline-color'">{{item.ip}}</span>
                </el-col>
                <el-col :span="11" style="text-align: center;">
                  <span style="margin-left: 10px;font-size: 12px;"
                        :class="item.onlinestate==1?'online-color':'offline-color'">{{item.imsi}}</span>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-aside>
        <el-main style="padding: 10px 0px 10px 0px;">
          <div>
            <el-card>
              <el-row type="flex" :gutter="10">
                <el-col :span="3" style="text-align: right;">
                  <el-tag size="small">全局端口号:</el-tag>
                </el-col>
                <el-col :span="9">
                  <el-input size="mini" v-model="globalPort"></el-input>
                </el-col>
                <el-col :span="3" style="text-align: right;">
                  <el-tag size="small">全局招测间隔:</el-tag>
                </el-col>
                <el-col :span="9">
                  <el-input size="mini" v-model="globalInterval"></el-input>
                </el-col>
              </el-row>
            </el-card>
            <el-card>
              <el-row type="flex" align="middle">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">ip 选择区间:</el-tag>
                </el-col>
                <el-col :span="8">
                  <ChildeOne v-model="pojo.startip"></ChildeOne>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">至:</el-tag>
                </el-col>
                <el-col :span="8">
                  <ChildeOne v-model="pojo.endip"></ChildeOne>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">测试类型:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="pojo.testType" size="mini">
                    <el-radio :label="'0'">招 测</el-radio>
                    <el-radio :label="'1'">上 报</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">端口号:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.portNum"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">上报数据个数:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.numOfPktsPerTime"></el-input>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">数据长度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.dataLength"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">ip 地址</el-tag>
                </el-col>
                <el-col :span="8">
                  <ChildeOne v-model="pojo.ip"></ChildeOne>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">上报周期</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input size="mini" v-model="pojo.intervalOfPerPkt"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-tag size="small">毫秒</el-tag>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small" v-if="pojo.testType==0">招测间隔</el-tag>
                  <el-tag size="small" v-else="pojo.testType==1">主动上报间隔</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input size="mini" v-model="pojo.intervalOfPerTime"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-tag size="small">秒</el-tag>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">分批时延</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.batchDelay"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small" v-if="pojo.testType==0">招测长度</el-tag>
                  <el-tag size="small" v-else="pojo.testType==1">主动上报长度</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.callLength"></el-input>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 20px;">
                  <el-tag size="small">单批数量</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input size="mini" v-model="pojo.batchNum"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" style="padding-top: 5px;padding-bottom: 5px;">
                <el-col :span="12" style="text-align: center;">
                  <el-button size="small" @click="addConfig">配置</el-button>
                  <el-button size="small" @click="saveHistory">保存配置</el-button>
                </el-col>
                <el-col :span="12" style="text-align: center;">
                  <el-button size="small" @click="pojo={}">重置</el-button>
                  <el-button size="small" @click="selectConfig">以往配置</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card>
              <el-row type="flex" align="middle">
                <el-col :span="4">
                  <el-tag size="small">已配置的规则列表</el-tag>
                </el-col>
                <el-col :span="4">
                  <i class="el-icon-circle-close" style="font-size: 18px;color: red;" @click="deleteAll"></i>
                </el-col>
              </el-row>
              <el-table style="width: 100%" :data="configs" size="mini">
                <el-table-column label="测试类型" prop="testType" :formatter="testTypeFormat">
                </el-table-column>
                <el-table-column label="上报数据个数" prop="numOfPktsPerTime">
                </el-table-column>
                <el-table-column label="上报周期" prop="intervalOfPerPkt">
                </el-table-column>
                <el-table-column label="数据长度" prop="dataLength">
                </el-table-column>
                <el-table-column label="端口号" prop="portNum">
                </el-table-column>
                <el-table-column label="主动上报间隔/招测间隔" prop="intervalOfPerTime">
                </el-table-column>
                <el-table-column label="招测长度" prop="callLength">
                </el-table-column>
                <el-table-column label="分批时延" prop="batchDelay">
                </el-table-column>
                <el-table-column label="单批数量" prop="batchNum">
                </el-table-column>
                <el-table-column label="操 作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="handleDeleteConfig(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-main>
      </el-container>
      <el-dialog title="配置IP" :visible.sync="lookDialogVisible">
        <div>
          <el-tag v-for="item of lookDialogData" style="width: 20%;">{{item}}</el-tag>
        </div>
      </el-dialog>
      <el-dialog title="历史配置" :visible.sync="historyConfigVisible">
        <el-table :data="historyConfigData" size="mini" style="width: 100%">
          <el-table-column
            fixed="right"
            label="操作"
            width="50">
            <template slot-scope="scope">
              <el-button @click="selectHistory(scope.row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="50">
            <template slot-scope="scope">
              <el-button @click="deleteHistory(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="测试类型" prop="testType" :formatter="testTypeFormat"></el-table-column>
          <el-table-column label="端口号" prop="portNum"></el-table-column>
          <el-table-column label="上报数据个数" prop="numOfPktsPerTime"></el-table-column>
          <el-table-column label="数据长度" prop="dataLength"></el-table-column>
          <el-table-column label="IP地址" prop="ip"></el-table-column>
          <el-table-column label="上报周期" prop="intervalOfPerPkt"></el-table-column>
          <el-table-column label="间隔" prop="intervalOfPerTime"></el-table-column>
          <el-table-column label="召测长度" prop="callLength"></el-table-column>
          <el-table-column label="分批时延" prop="batchDelay"></el-table-column>
          <el-table-column label="单批数量" prop="batchNum"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import analogApi from "@/api/analog";
  import configApi from "@/api/config";
  import IpInput from "@/components/IpInput";
  import IpVue from "@/components/IpVue";
  import ChildeOne from "@/components/ChildeOne";

  export default {
    name: "Forms",
    components: {IpInput, ChildeOne, IpVue},
    data() {
      return {
        chileName: "okokok",
        ueNum: 0,
        stationId: '',
        stations: [],
        ueList: [],
        testType: 0,
        configs: [],
        usedImsi: [],
        checkedUe: {},
        checkAllState: false,
        lookDialogVisible: false,
        lookDialogData: [],
        pojo: {testType: '0'},
        historyConfigVisible: false,
        historyConfigData: [],
        websock: null,
        globalPort: null,
        globalInterval: null,
      }
    },
    computed: {
      allip() {
        return this.pojo.startip;
      }
    },
    created() {
      this.loadAnalog();
      this.loadConfigs();
      this.initWebSocket();
      this.loadGlobalData();
    },
    destroyed() {
      this.websock.close();
    },
    methods: {
      //websocket相关方法
      initWebSocket() {
        var wsuri = process.env.WS_API + "/websocket";
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() {
        console.log("WebSocket连接成功");
      },
      websocketonmessage(e) {
        console.log(e.data);
        //此处如果eNodeBId对应上重新获取，否则不管
        if (this.stationId != undefined || this.stationId != null) {
          if (this.stationId == e.data.eNodeBId) {
            this.loadUeList(this.stationId);
          }
        }
      },
      websocketonerror(e) {
        alert("WebSocket连接发生错误");
      },
      websocketclose(e) {
        console.log("connection closed (" + e.code + ")");
      },
      websocketsend(agentData) {
        this.websock.send(agentData);
      },
      //加载全局数据
      loadGlobalData() {
        configApi.getGlobalPortAndrInterval()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              var portInterval = ret.data;
              this.globalPort = portInterval[0];
              this.globalInterval = portInterval[1];
            } else {
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      //
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
      //
      saveHistory() {
        configApi.addExcelConfig(this.pojo)
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      selectHistory(row) {
        this.pojo = row;
        this.historyConfigVisible = false;
      },
      deleteHistory(row) {
        configApi.deleteExcelConfig(row.id)
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.historyConfigData = ret.data;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      selectConfig() {
        configApi.getExcelConfig()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.historyConfigData = ret.data;
              this.historyConfigVisible = true;
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      addConfig() {
        this.pojo.ueList = {};
        for (var imsi in this.checkedUe) {
          var ip = this.checkedUe[imsi].ip;
          this.pojo.ueList[ip] = imsi;
        }
        configApi.add(this.pojo)
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs = ret.data;
              this.$message({message: '添加成功',type: 'success'});
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      deleteAll() {
        configApi.deleteAll()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs = [];
              this.usedImsi = [];
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      handleDeleteConfig(row) {
        configApi.delete(row.id)
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs = ret.data;
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      handleClick(row) {
        this.lookDialogData = Object.keys(row.ueList);
        this.lookDialogVisible = true;
      },
      testTypeFormat(row, column, cellValue, index) {
        if (cellValue == '0') {
          return "召测";
        } else if (cellValue == '1') {
          return "上报";
        }
      },
      handleStart() {
        if (this.globalPort == null || this.globalPort.length == 0) {
          this.$message.error('全局端口号不能为空!');
          return;
        }
        if (this.globalInterval == null || this.globalInterval.length == 0) {
          this.$message.error('全局招测间隔不能为空!');
          return;
        }

        configApi.clean()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              configApi.starttest(this.globalPort, this.globalInterval)
                .then(response => {
                  var ret = response.data;
                  if (ret.flag) {
                    this.$message({message: '清空数据成功，开始测试', type: 'success', duration: 1000});
                    setTimeout(() => {
                      this.$router.push({path: '/run'})
                    }, 2000)
                  } else {
                    this.$message.error(ret.message);
                  }
                })
                .catch(error => {
                  this.$message.error(error);
                })
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      loadAnalog() {
        analogApi.getStationDatas()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.stations = ret.data;
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      loadUeList(id) {
        analogApi.getTerminalDatas(id)
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.ueList = ret.data;
              this.ueNum = this.ueList.length;
              this.refreshUsedImsi();
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      loadConfigs() {
        configApi.getall()
          .then(response => {
            var ret = response.data;
            if (ret.flag) {
              this.configs = ret.data;
            } else {
              this.$message.error(ret.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          })
      },
      handleUeCheck(item) {
        this.$forceUpdate();
        if (item.checked) {
          this.checkedUe[item.imsi] = item;
        } else {
          delete this.checkedUe[item.imsi];
        }
      },
      refreshUsedImsi() {
        var checkedImsi = Object.keys(this.checkedUe);
        this.ueList.forEach((value, index) => {
          if (this.usedImsi.includes(value.imsi, 0)) {
            value.used = true;
          } else {
            value.used = false;
            if (checkedImsi.includes(value.imsi, 0)) {
              value.checked = true;
            } else {
              value.checked = false;
            }
          }
        })
      },
      handleCheckAll() {
        this.ueList.forEach((value, index) => {
          if (this.usedImsi.includes(value.imsi, 0)) {
            value.used = true;
          } else {
            if (this.checkAllState) {
              value.checked = true;
              this.checkedUe[value.imsi] = value;
            } else {
              value.checked = false;
              delete this.checkedUe[value.imsi];
            }
          }
        })
      }
    },
    watch: {
      stationId: function (val) {
        if (val != null) {
          this.checkAllState = false;
          this.loadUeList(val);
        }
      },
      configs: function (val) {
        var imsis = [];
        this.configs.forEach((value, index) => {
          var ipimsi = value.ueList;
          for (var ip in ipimsi) {
            imsis.push(ipimsi[ip]);
          }
        });
        this.usedImsi = imsis;
        this.refreshUsedImsi();
      },
    }
  }
</script>

<style scoped>

  .checkbox_vis {
    margin: 0px;
  }

  .checkbox_invis {
    margin: 0px;
    visibility: hidden;
  }

  .online-color {
    color: black;
  }

  .offline-color {
    color: grey;
  }

  el-aside {
    background-color: brown;
  }

  el-main {
    background-color: #42b983;
  }
</style>
