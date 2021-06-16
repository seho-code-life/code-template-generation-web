<template>
  <div class="start-box">
    <Row justify="center" style="margin-top: 30vh">
      <Col :span="6">
        <Card
          hoverable
          title="基于Restful风格的API生成器"
          style="margin: 0 auto"
        >
          <p>
            只需要提供少许的字段，就能在对应目录下生成基本的CRUD代码，很建议用户使用与之配套的代码模板，这样工具可以少做一些步骤。
          </p>
          <Button style="margin-right: 10px" @click="handleGetApiList"
            >查看已有的API</Button
          >
          <Button type="primary" @click="startConfigModel = true"
            >开始配置</Button
          >
        </Card>
      </Col>
    </Row>
    <!-- API列表弹窗 -->
    <Modal v-model:visible="apiListModel" :footer="null">
      <div style="max-height: 400px; overflow-y: scroll">
        <List size="small" :data-source="apiList">
          <template #renderItem="{ item }">
            <ListItem>{{ item }}</ListItem>
          </template>
        </List>
      </div>
    </Modal>
    <!-- 配置新增的API弹窗 -->
    <Modal title="配置向导" v-model:visible="startConfigModel" :footer="null">
      <Alert
        message="请确保没有增加过此模块的API, 目录中如果查询到相同模块名称的api文件，则会添加失败~"
        type="warning"
      ></Alert>
      <Form
        style="margin-top: 20px"
        :model="form"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 14 }"
      >
        <FormItem label="模块名称(英文)">
          <Input
            v-model:value="form.moduleName"
            placeholder="举例: users,products,questions等等,请添加复数(s)"
          ></Input>
        </FormItem>
        <FormItem label="选择功能">
          <CheckboxGroup v-model:value="form.checkFeatures">
            <Checkbox
              :value="item.type"
              :name="item.name"
              v-for="(item, index) in features"
              :key="index"
            >
              {{ item.name }}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem :wrapper-col="{ span: 14, offset: 9 }">
          <Button>取消</Button>
          <Button @click="handleAddApi" style="margin-left: 10px" type="primary"
            >完成</Button
          >
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, UnwrapRef } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Empty,
  List,
  Input,
  Form,
  Checkbox,
  Alert,
  message,
} from "ant-design-vue";
import { getApiList, addApi } from "../../api/api";
import { checkFileExists } from "../../api/common";
import testApi from "../../api/test";
interface FormConfig {
  moduleName: string;
  generateType: "class" | "function";
  moduleCN?: string;
  urlPrefix?: string;
  version: string;
  checkFeatures: string[];
}
const { Item: ListItem } = List;
const { Item: FormItem } = Form;
const { Group: CheckboxGroup } = Checkbox;
const route = useRoute();
const info = ref({});
const apiList = ref([]);
const apiListModel = ref(false);
// 配置窗口的model
const startConfigModel = ref(false);
// 新建API的form
const form: UnwrapRef<FormConfig> = reactive({
  moduleName: "",
  version: "v1",
  generateType: "class",
  checkFeatures: ["create", "delete", "update", "read"],
});


const t = new testApi();
console.log(t.create().then(res => {
  console.log(res);
}))

// 功能
const features = ref<Array<any>>([
  {
    name: "添加",
    type: "create",
  },
  {
    name: "删除",
    type: "delete",
  },
  {
    name: "修改",
    type: "update",
  },
  {
    name: "查询",
    type: "read",
  },
]);
// 解析传递的参数
onMounted(() => {
  // info.value = JSON.parse(decodeURIComponent(route.query.info));
});
const handleGetApiList = async () => {
  // 打开显示api列表的model
  const resultData = await getApiList();
  if (resultData.success) {
    apiListModel.value = true;
    apiList.value = resultData.data;
  }
};
// 添加api
const handleAddApi = async () => {
  // 检查参数合法性
  if (form.moduleName !== "") {
    // 检查模块名是否存在，如果存在则提示
    const moduleName = form.moduleName.trim();
    const checkResult = await checkFileExists({
      filePath: `/src/api/${moduleName}.js`,
    });
    if (checkResult.success) {
      if (checkResult.data) {
        // 如果存在报错
        message.warning(`${moduleName}模块已存在`);
      } else {
        // 添加
        const addResult = await addApi({
          moduleName
        });
        if(addResult.success){
          message.success(`${moduleName}-API添加成功!`);
          startConfigModel.value = false;
          form.moduleName = "";
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>