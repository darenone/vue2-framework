<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>afs模块接口</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                获取光配机详情（get）
              </template>
              <el-descriptions class="margin-top" title="光配机详情" :column="3" border>
                <template slot="extra">
                  <el-button type="primary" @click="getAfsInfo">操作</el-button>
                </template>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user" />
                    用户名
                  </template>
                  kooriookami
                </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>oen模块接口</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>pem模块接口</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>system模块接口</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import AfsInfoApi from '@/api/afs/AfsInfoApi'
  export default {
    data() {
      return {
        activeNames: ['1']
      }
    },
    methods: {
      async getAfsInfo() {
        const afsInfo = await AfsInfoApi.find({ deviceId: '2023091802' })
        console.log(afsInfo)
      }
    }
  }
</script>
