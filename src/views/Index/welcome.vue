<template>
  <div id="app">
    <div class="title">
      hello, this is code-template-generation-web for Ziggurat
    </div>
    <!-- 展示启动项目的根路径，根据接口返回pass与否，来展示 -->
    <template v-if="projectInfo.state !== 'pass'">
      <Empty
        style="margin-top: 20px"
        description="该项目目录结构不合法，需要拥有一个package.json"
      ></Empty>
      <div style="text-align: center">
        <Divider>如何解决?</Divider>
        <TypographyText secondary>进入需要配置的项目的命令行之后再运行（根目录需要拥有package.json）</TypographyText>
        <TypographyText code>seho start</TypographyText>
      </div>
    </template>
    <!-- 展示项目卡片 -->
    <Card v-else style="width: 40vw; margin: 35px auto">
      <p>项目路径: {{ projectInfo.path }}</p>
      <p>项目名称: {{ projectInfo.data.name }}</p>
      <p>项目版本: {{ projectInfo.data.version }}</p>
      <Button @click="handleStartConfig" style="width: 100%" type="primary"
        >开始配置</Button
      >
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { Empty, Card, Button, Typography, Divider } from "ant-design-vue";
import { getCurrentProjectInfo } from "../../api/common";
import { useRouter } from "vue-router";
const projectInfo = ref<any>({});
const router = useRouter();
const { Text: TypographyText } = Typography;
// 获取当前项目的信息
const getInfo = async () => {
  const infoData = await getCurrentProjectInfo();
  if (infoData.success) {
    projectInfo.value = infoData.data;
    console.log(projectInfo.value);
  }
};
getInfo();
// 点击开始配置
const handleStartConfig = () => {
  router.push({
    path: "/start",
    query: {
      info: encodeURIComponent(
        JSON.stringify({
          path: projectInfo.value.path,
          name: projectInfo.value.data.name,
        })
      ),
    },
  });
};
</script>

<style lang="scss">
#app {
  .title {
    font-size: 22px;
    text-align: center;
    font-weight: bold;
    margin-top: 30vh;
  }
}
</style>
