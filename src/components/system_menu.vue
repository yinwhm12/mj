<template>
    <!-- 系统消息界面-->

  <div>
    <el-row class="tac" type="flex" :gutter="10">
      <el-col :span="3">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(menu,index) in tableMenus">
            <el-menu-item :index="index.toString()">{{ menu }}</el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <!-- 右侧内容 表格-->

      <el-col :span="24">

              <el-row>
                <el-col>
                  <div style="width: 100%;height: 50px;display: inline-block;">
                    <div class="block">
                      <span class="demonstration">时间:</span>
                      <el-date-picker
                        v-model="value6"
                        type="daterange"
                        placeholder="选择日期范围">
                      </el-date-picker>
                    </div>
                  </div>
                </el-col>
              </el-row>


        <el-row>
          <el-col>
              <div style="float: right"><el-button type="primary" size="small" @click="openDialog"><i class="el-icon-plus"></i>
              <span v-if="menuIndex == 0">添加公告</span>
              <span v-else>添加广播</span>
              </el-button></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              type="expand"
              height="80px">
                <el-table-column
                  prop="date"
                  :label="titleOne[Number(menuIndex)]"
                  width="130">
                </el-table-column>
                <el-table-column
                    prop="date"
                    :label="titleTwo[Number(menuIndex)]"
                    width="480">
                  </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作"
                    width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small">已发布</el-button>
                    <!--<el-button type="primary" size="small">修改</el-button>-->
                    <el-button type="primary" size="small">删除</el-button>
                  </template>
                  </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>

    </el-row>

    <el-dialog
      v-model="dialogVisible"
      size="tiny">
      <game-publish :whichOne="whichOne" @close="onEditClose"></game-publish>
    </el-dialog>
  </div>

</template>


<script>
  import {mapGetters} from 'vuex'
  import GamePublish from './publish_game.vue'

  export default {
    components:{
      GamePublish,
    },
    data(){
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        value6: '',
        clickedMenu: [],
        dialogVisible: false,
        titleOne:['发布时间','广播时间'],
        titleTwo:['公告','广播'],
        whichOne: '0',
        tableData: [{
          date: '2016-05-02',
        }, {
          date: '2016-05-04',
        }, {
          date: '2016-05-01',
        }, {
          date: '2016-05-03',
        }]
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getSystemMenu',
        tableFirstTitle: 'getSystemFirst',
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        this.whichOne = key
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      },
      openDialog(){
        this.dialogVisible = true
      },
      onEditClose(needRefresh){
        this.dialogVisible = false
      }
    },
    mounted: function () {
      this.loading()
    }
  }
</script>
