<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="box-card">
          <el-collapse v-model="activeNames" style="text-align: left;">
            <el-collapse-item name="1">
              <template slot="title">
                获取系统用户信息（get请求）
              </template>
              <el-button type="primary" @click="upDateInfo">发送get请求</el-button>
              <div><strong>接口：</strong>http://192.168.55.117/services/authen/info</div>
              <div><strong>返回结果：</strong></div>
              <div>真实姓名：{{ getUser.realName }}</div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" style="text-align: left;">
            <el-collapse-item name="2">
              <template slot="title">
                获取光配机详情（get请求）
              </template>
              <el-button type="primary" @click="getAfsInfo">发送get请求</el-button>
              <div><strong>接口：</strong>http://192.168.55.221/services/afs/afsInfo/find?deviceId=2023091802&deviceName=afs</div>
              <div><strong>返回结果：</strong></div>
              <div>光配机编码：{{ afsInfo.afsId }}</div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" style="text-align: left;">
            <el-collapse-item name="3">
              <template slot="title">
                获取光配机列表分页（get请求）
              </template>
              <el-button type="primary" @click="loadData">发送get请求</el-button>
              <div><strong>接口：</strong>http://192.168.55.117/services/afs/afsInfo/page?page=1&size=20</div>
              <div><strong>返回结果：</strong></div>
              <el-table :data="afsList" border stripe>
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  align="center"
                  fixed="left"
                >
                  <template slot-scope="scope">
                    <span>{{ (pageData.page - 1) * pageData.size + scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="afsId"
                  label="光配机编码"
                />
                <el-table-column
                  prop="device.softVersion"
                  label="版本号"
                />
              </el-table>
              <el-pagination
                class="mt-10 text-right"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :current-page="pageData.page"
                :page-size="pageData.size"
                :total="pageData.total"
                @size-change="sizeChange"
                @current-change="currentChange"
              />
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" style="text-align: left;">
            <el-collapse-item name="4">
              <template slot="title">
                获取光配机运行状态统计（post请求）
              </template>
              <el-button type="primary" @click="deviceRunStatus">发送post请求</el-button>
              <div><strong>接口：</strong>http://192.168.55.117/services/afs/afsInfo/deviceRunStatus</div>
              <div><strong>返回结果：</strong></div>
              <div>光配机编码：{{ afsInfo.afsId }}</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import AfsInfoApi from '@/api/afs/AfsInfoApi'
  export default {
    data() {
      return {
        activeNames: ['1'],
        afsInfo: {},
        afsList: [],
        pageData: {
          page: 1,
          size: 10
        }
      }
    },
    computed: {
      ...mapGetters(['getUser'])
    },
    methods: {
      ...mapActions(['upDateInfo']),
      async getAfsInfo() {
        try {
          const afsInfo = await AfsInfoApi.find({ deviceId: '2023091802', deviceName: 'afs' })
          this.afsInfo = afsInfo
        } catch (error) {
          console.log(error)
        }
      },
      async loadData() {
        const { total, list } = await AfsInfoApi.page(this.pageData)
        this.afsList = list
        this.pageData.total = total
      },
      sizeChange(size) {
        this.pageData.page = 1
        this.pageData.size = size
        this.loadData()
      },
      currentChange(page) {
        this.pageData.page = page
        this.loadData()
      },
      async deviceRunStatus() {
        const a = await AfsInfoApi.deviceOnlineStatus(['20230413090548923010941'])
        console.log(a)
      }
    }
  }
</script>
