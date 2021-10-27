<template>
  <div class=" col-11 mx-auto p-0 mt-5">
    
    <form action="" @submit.prevent="postData()" method="post">
      <div class="submenu d-flex flex-row flex-wrap  mb-3">
        <div class="select">
        <select class="p-1"  name="language" @click="changeLang()" v-model="post.select_language" id="language">
          <option  value ="" disabled>Select language </option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>
       <div class="select">
        <select class="p-1" name="editor_theme"  v-model="editor_theme" id="editor_theme">
          <option  value ="" disabled>Select Theme </option>
          <option value="eclipse">eclipse</option>
          <option value="solarized_dark">solarized_dark</option>
          <option value="solarized_light">solarized_light</option>
          <option value="terminal">terminal</option>
          <option value="twilight">twilight</option>
          <option value="textmate">textmate</option>
          <option value="dracula">dracula</option>
          <option value="tomorrow_night_eighties">tomorrow_night_eighties</option>
          <option value="tomorrow_night_blue">tomorrow_night_blue</option>

        </select>
      </div>
       
       <div class="run-code">
        <button class="btn btn-primary " type="submit">run</button>
      </div>

      </div>
      
      <div class="codesection d-flex flex-row flex-wrap flex-sm-wrap flex-md-nowrap
       flex-lg-nowrap justify-content-between">
        <div class="codewrite col-12 col-xs-12   col-sm-12 col-md-6 mb-2" >
          <editor v-model="codearea" @init="editorInit" :lang="language" :theme="editor_theme" width="100%" height="100%"></editor>

        <!-- <textarea name="codearea" v-model="post.codearea"  id="codeinput"    cols="120"  rows="20"  ></textarea> -->
        </div>
        <div class="codeoutput col-xs-12 col-12 col-sm-12 col-md-6 ">
          
          
        </div>

      </div>
      
      
    </form>
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "CodeCompiler",
  
  data() {
    return {
      content:'',
      language:'c_cpp',
      editor_theme:'',
      post: {
        userId: "6177628dcfa2f4eaf3326424",
        select_language: 'c',
        codearea: null,
      },
    };
  },
  computed:{
    
  },
  methods: {
    changeLang(){
      if(this.post.select_language === 'python'){
          this.language = 'python';
      } else if(this.post.select_language === 'java'){
        this.language = 'java';
      } else if(this.post.select_language === 'c_cpp'){
        this.language = 'c_cpp';
      }

    },
    postData() {
      console.log("data sending data :", this.post);
      axios
        .post(`http://localhost:3000/codes/${this.post.select_language}`, this.post)
        .then((res) => console.log(res.data));
    },
    editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/python')    //language
            require('brace/mode/c_cpp')  
            require('brace/mode/java')  
            require('brace/mode/less')

            require('brace/theme/tomorrow_night_eighties')
            require('brace/theme/tomorrow_night_blue')
            require('brace/theme/eclipse')
            require('brace/theme/solarized_dark')
            require('brace/theme/solarized_light')
            require('brace/theme/terminal')
            require('brace/theme/twilight')
            require('brace/theme/textmate')
            require('brace/theme/dracula')

            require('brace/snippets/javascript') //snippet
            require('brace/snippets/python') 
        }
  },
  components: {
        editor: require('vue2-ace-editor'),
  },
  
};
</script>

<style scoped>
.select{
  margin-right:1em;
  margin-bottom:1em;
  outline:none;
  border:none;
}
.select select:hover{
  border:2px solid #7aa2dd;
  border-radius: 2px;
}
.select select:focus{
  border:2px solid #0d6efd;
}
.select select::-moz-selection{
  border:2px solid #7aa2dd;
}
.btn{
  padding: .21em 2em;
}
.codewrite {
  /* width: 90%; */
  height:450px;
  border:1px solid grey;
}
.codeoutput{
  background-color:black;
  
  height:450px;
  /* width:100%; */
  /* height:100%; */
}
@media only screen and (min-width:760px){
  .codeoutput{
    margin-left: .5em;
    
  }

}
 
</style>
