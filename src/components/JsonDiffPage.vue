<template>

  <div class="container">

    <Row type="flex" justify="center" class="sub_title">
      <Col span="24"><h1>JSON在线对比工具 by upuptop</h1></Col>
    </Row>
    <br>
    <br>

    <Row type="flex" justify="center" class="sub_title">
      <Col span="12"><h3>第一个json串</h3></Col>
      <Col span="12"><h3>第二个json串</h3></Col>
    </Row>

    <Row type="flex" justify="center" class="sub_title">
      <Col span="12">
        <Input v-model="jsonOne" class="area_input" type="textarea" :rows="4"
               placeholder="请输入第一个json串"></Input>
      </Col>

      <Col span="12">
        <Input v-model="jsonTwo" class="area_input" type="textarea" :rows="4"
               placeholder="请输入第一个json串"></Input>
      </Col>
    </Row>

    <br>
    <br>

    <Row type="flex" justify="center" class="sub_title">
      <Col span="24"><h1>格式化结果</h1></Col>
    </Row>
    <Row type="flex" justify="center" class="sub_title"
         v-if="this.jsUtil.isJSON(jsonOne) || this.jsUtil.isJSON(jsonTwo)">
      <Col span="24">
        <Button type="primary" @click="close(true)">合并所有节点</Button>
        <Button type="primary" @click="close(false)">打开所有节点</Button>
        <!--        <Button type="primary" @click="diff()">对比</Button>-->
        <Button type="primary" @click="clear()">清空</Button>
      </Col>
    </Row>


    <Row>
      <Col span="12">
        <div class="json_viewer_div">
          <json-view :deep="5" :closed="isClosed" :data="JSON.parse(jsonOne)"
                     v-if="this.jsUtil.isJSON(jsonOne)"/>
        </div>
      </Col>
      <Col span="12">
        <div class="json_viewer_div">
          <json-view :deep="5" :closed="isClosed" :data="JSON.parse(jsonTwo)"
                     v-if="this.jsUtil.isJSON(jsonTwo)"/>
        </div>
      </Col>
    </Row>

    <Row type="flex" justify="center" class="sub_title"
         v-if="jsonTwo || jsonOne">
      <Col span="24"><h1>JSON 对比结果</h1></Col>
    </Row>

    <Row>
      <Col span="24">
        <div v-if="jsonTwo || jsonOne">
          <code-diff :old-string="jsonOne" :new-string="jsonTwo" :context="10"
                     outputFormat="side-by-side"/>
        </div>
      </Col>
    </Row>

  </div>

</template>


<script>
    import jsonView from 'vue-json-views'
    import CodeDiff from 'vue-code-diff'
    import jsUtil from '../utils/utils'

    // import jsonData from '../assets/jsonjson.json'

    export default {
        components: {
            jsonView,
            CodeDiff
        },
        data() {
            return {
                // json: jsonData,
                isClosed: false,
                jsonOne: "",
                jsonTwo: "",
                jsUtil: jsUtil
            }
        },
        watch: {
            jsonOne: function (n, o) {
                if (n && !jsUtil.isJSON(n)) {
                    this.$Message.error('第一个json串格式错误！');
                } else {
                    //     排序
                    this.sortOneData()
                }

            },
            jsonTwo: function (n, o) {
                if (n && !jsUtil.isJSON(n)) {
                    this.$Message.error('第二个json串格式错误！');
                } else {
                    //     排序
                    this.sortTwoData()
                }

            }
        },
        methods: {
            close(flag) {
                this.isClosed = flag
            },

            sortOneData() {
                let result = this.jsUtil.JSONSort(JSON.parse(this.jsonOne));
                this.jsonOne = JSON.stringify(result, null, 4)

                // const _this = this;
                // this.axios.post('json/sort', {
                //     'json': _this.jsonOne,
                // }).then(res => {
                //     _this.jsonOne = JSON.stringify(res.data, null, 4)
                // }).catch(res => {
                //     console.log(res);
                // })
            },
            sortTwoData() {
                let result = this.jsUtil.JSONSort(JSON.parse(this.jsonTwo));
                this.jsonTwo = JSON.stringify(result, null, 4)

                // this.jsUtil.JSONSort(this.jsonTwo)

                // const _this = this;
                // this.axios.post('json/sort', {
                //     'json': _this.jsonTwo,
                // }).then(res => {
                //     _this.jsonTwo = JSON.stringify(res.data, null, 4)
                // }).catch(res => {
                //     console.log(res);
                // })
            },
            clear() {
                this.jsonOne = "{}"
                this.jsonTwo = "{}"
            },
        }
    }
</script>

<style scoped>
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }


  .sub_title {
    text-align: center;
  }

  .area_input {
    padding: 10px;
  }

  .json_viewer_div {
    width: 98%;
    margin: 10px;
    height: 500px;
    overflow-y: scroll;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
  }


</style>
