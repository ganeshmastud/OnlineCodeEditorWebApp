(function(e){function t(t){for(var a,r,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);g&&g(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},o={app:0},i=[];function s(e){return c.p+"js/"+({"Code Editor":"Code Editor",Login:"Login",PageNotFound:"PageNotFound",Register:"Register"}[e]||e)+"."+{"Code Editor":"76a057fb",Login:"ea33f0ca",PageNotFound:"8c69f802",Register:"69fee523"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"Code Editor":1,Login:1,Register:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({"Code Editor":"Code Editor",Login:"Login",PageNotFound:"PageNotFound",Register:"Register"}[e]||e)+"."+{"Code Editor":"e3fc8cb3",Login:"702c4654",PageNotFound:"31d6cfe0",Register:"caef29e3"}[e]+".css",o=c.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===a||l===o)return t()}var g=document.createElement("link");g.rel="stylesheet",g.type="text/css",g.onload=t,g.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],g.parentNode.removeChild(g),n(i)},g.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(g)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(g);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}o[e]=void 0}};var g=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var g=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"172e":function(e,t,n){},"37bf":function(e,t,n){},"3b9a":function(e,t,n){"use strict";n("37bf")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Navbar"),n("router-view")],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:" col-12 bg-primary"},[n("div",{staticClass:"col-12 col-lg-11  bg-primary mx-auto"},[n("b-navbar",{staticClass:"col-11  col-lg-12 pt-2  pt-lg-0 pb-lg-0 mx-auto",attrs:{toggleable:"lg",type:"dark",variant:"primary"}},[n("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[e._v("Code Editor")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"d-flex justify-content-start col-12 mt-3 mt-lg-0  col-sm-12 col-lg-6"},[e.isAuthenticated?n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link px-2 ",attrs:{to:"/"}},[e._v("Home")])],1):e._e(),e.isAuthenticated?n("li",{staticClass:"nav-item "},[n("router-link",{staticClass:"nav-link px-2",attrs:{to:"/codeeditor"}},[e._v("Start Coding")])],1):e._e()]),n("b-navbar-nav",{staticClass:" col-6 justify-content-end col-12 col-sm-12 col-lg-6"},[e.isAuthenticated?n("li",{staticClass:"nav-item user-profile "},[n("router-link",{staticClass:"nav-link px-2",attrs:{to:"#"}},[e._v("Hello "+e._s(e.email))])],1):e._e(),e.isAuthenticated?n("li",{staticClass:"nav-item  "},[n("span",{staticClass:"nav-link px-2",on:{click:function(t){return e.logout()}}},[e._v("Logout")])]):n("li",{staticClass:"nav-item "},[n("router-link",{staticClass:"nav-link px-2",attrs:{to:"/login"}},[e._v("Login")])],1)])],1)],1)],1)])},s=[],c={name:"NavBar",computed:{email:function(){return this.$store.state.auth.email},isAuthenticated:function(){return this.$store.getters.isAuthenticated}},methods:{logout:function(){var e=this;this.$store.dispatch("logout").then((function(){return e.$router.push({name:"login"})}))}}},u=c,l=(n("fa86"),n("2877")),d=Object(l["a"])(u,i,s,!1,null,"70fda1c6",null),g=d.exports,f={name:"App",components:{Navbar:g}},m=f,h=Object(l["a"])(m,r,o,!1,null,null,null),p=h.exports,v=n("5f5b"),b=n("b1e0"),C=n("bc3a"),_=n.n(C),w=n("8c4f"),x=n("130e"),y=n("2f62"),k=(n("f9e3"),n("2dd8"),n("ab8b"),n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("1da1")),E=(n("96cf"),n("eeb9")),j=function(e){return e.data},A=function(e){throw console.log(e.message),e},L=function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,E["a"].post("/auth/login",t,{headers:{"Content-Type":"application/json"}}).then(j).catch(A);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();n("caad"),n("2532");function O(e){E["a"].interceptors.request.use((function(t){return(t.url.includes("codes")||t.url.includes("user"))&&(t.headers["Authorization"]=e),t}),(function(e){return Promise.reject(e)}))}var S="token",P="email",F="userId",I={state:{token:localStorage.getItem(S)||"",email:localStorage.getItem(P)||"",userId:localStorage.getItem(F)||""},getters:{isAuthenticated:function(e){return!!e.token},getToken:function(e){return e.token}},mutations:{setToken:function(e,t){e.token=t},setEmail:function(e,t){e.email=t},setUserID:function(e,t){e.userId=t}},actions:{login:function(e,t){var n=e.commit;return L(t).then((function(e){var t=e.token,a=e.email,r=e.userId;return localStorage.setItem(S,t),localStorage.setItem(P,a),localStorage.setItem(F,r),n("setToken",t),n("setEmail",a),n("setUserID",r),O(t),a}))},logout:function(e){var t=e.commit;return localStorage.removeItem(S),localStorage.removeItem(P),localStorage.removeItem(F),t("setToken",""),t("setEmail",""),t("setUserID",""),Promise.resolve()}}};O(I.state.token);var R=I,T=(n("159b"),n("b64b"),{state:{code:{c:"",cpp:"",java:"",python:""},codeFiles:[],lang:"",theme:""},getters:{getLanguage:function(e){return e.lang},getTheme:function(e){return e.theme},getCodeFiles:function(e){return e.codeFiles},getCode:function(e){return e.code}},mutations:{setLanguage:function(e,t){e.lang=t},setTheme:function(e,t){e.theme=t},addCode:function(e,t){Object.keys(e.code).forEach((function(n){n!==t.prev_selected_lang||(e.code[n]=t.prev_written_code)}))},updateCodeFile:function(e,t){e.codeFiles=t}},actions:{addCode:function(e,t){return Object(k["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,a("addCode",t);case 3:case"end":return n.stop()}}),n)})))()},fetchCodeFiles:function(e,t){return Object(k["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,n.next=3,E["a"].get("/user/".concat(t)).then((function(e){a("updateCodeFile",e.data.codeFiles),e.data.language&&a("setLanguage",e.data.language),e.data.theme&&a("setTheme",e.data.theme)})).catch((function(e){console.log("err in fetch theme",e)}));case 3:case"end":return n.stop()}}),n)})))()},updateLanguage:function(e,t){return Object(k["a"])(regeneratorRuntime.mark((function n(){var a,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,r=t.userId,o=t.language,n.next=4,E["a"].patch("/user/".concat(r,"/language"),{},{params:{language:o}}).then((function(e){a("setLanguage",e.data.language)})).catch((function(e){console.log("err in fetch language",e)}));case 4:case"end":return n.stop()}}),n)})))()},updateTheme:function(e,t){return Object(k["a"])(regeneratorRuntime.mark((function n(){var a,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,r=t.userId,o=t.theme,n.next=4,E["a"].patch("/user/".concat(r),{},{params:{theme:o}}).then((function(e){console.log(e.data),a("setTheme",e.data.theme)})).catch((function(e){console.log("err in fetch",e)}));case 4:case"end":return n.stop()}}),n)})))()}}}),N=T;a["default"].use(y["a"]);var $=new y["a"].Store({modules:{auth:R,userPreferance:N}}),D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-12 col-lg-11 mx-auto"},[n("div",{staticClass:"website-intro d-flex flex-wrap flex-sm-wrap flex-lg-nowrap"},[n("div",{staticClass:"content mt-4 mx-auto"},[e._m(0),e._m(1),n("div",{staticClass:"start-coding-container col-11 mx-auto"},[n("div",{staticClass:"start-coding"},[n("button",{staticClass:"btn btn-primary float-right",attrs:{title:"take you in the code editor"},on:{click:function(t){return e.startCoding()}}},[e._v("Start Coding")])])])]),e._m(2)])])},U=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"heading col-12 col-sm-12 col-md-10 mt-4 col-lg-10 mt-lg-5 d-flex"},[n("img",{staticClass:"logo ",attrs:{src:"/assets/code_64.png",alt:"codeeditor logo"}}),n("h3",[n("span",[e._v("Code Editor")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"features rounded col-11 col-sm-11 mt-4 px-2 px-md-3 pb-4 mb-4 mx-auto"},[n("h4",{staticClass:"h4 feature-list-heading pt-4"},[e._v("Features of the website")]),n("ul",{staticClass:"feature-list"},[n("li",{staticClass:"feature"},[e._v(" Users can write code in available languages.")]),n("li",{staticClass:"feature"},[e._v(" After the user login, his last worked language and theme are made available to him.")]),n("li",{staticClass:"feature"},[e._v(" For each language, only one file can be stored and its path is stored into the Users document in DB.")]),n("li",{staticClass:"feature"},[e._v(" When the user changes language without executing the code. His written code is stored into vuex store.")]),n("li",{staticClass:"feature"},[e._v(" After the user changes language. The popup form opens with the option to get the last executed code.")]),n("li",{staticClass:"feature"},[e._v("Code Download option is available.")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"image-illustrator col-12 col-sm-12 col-md-10 col-lg-8 mx-auto"},[n("img",{staticClass:"coding-image",attrs:{src:"/assets/coding.jpg",alt:"person coding in image"}})])}],B={name:"Home",computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}},methods:{startCoding:function(){this.isAuthenticated?this.$router.push("/codeeditor"):this.$router.push("/login")}}},H=B,M=(n("8b71"),n("3b9a"),Object(l["a"])(H,D,U,!1,null,"7660fba8",null)),q=M.exports,J=new w["a"]({mode:"history",routes:[{name:"home",path:"/",component:q},{name:"codeEditor",path:"/codeeditor",component:function(){return n.e("Code Editor").then(n.bind(null,"864f"))}},{name:"login",path:"/login",component:function(){return n.e("Login").then(n.bind(null,"578a"))}},{name:"register",path:"/signup",component:function(){return n.e("Register").then(n.bind(null,"5ace"))}},{name:"pageNotFound",path:"*",component:function(){return n.e("PageNotFound").then(n.bind(null,"42ec"))}}]}),z=!0;J.beforeEach((function(e,t,n){return!0!==z||"register"===e.name||"login"===e.name||$.getters.isAuthenticated?z||"register"!==e.name?void n():(z=!0,n("/signup")):(z=!1,n({name:"login"}))}));var K=J;a["default"].use(y["a"]),a["default"].use(x["a"],_.a),a["default"].use(w["a"]),a["default"].use(v["a"]),a["default"].use(b["a"]),a["default"].config.productionTip=!1,new a["default"]({router:K,store:$,render:function(e){return e(p)}}).$mount("#app")},"88d7":function(e,t,n){},"8b71":function(e,t,n){"use strict";n("88d7")},eeb9:function(e,t,n){"use strict";var a=n("bc3a"),r=n.n(a);t["a"]=r.a.create({baseURL:"http://localhost:3000"})},fa86:function(e,t,n){"use strict";n("172e")}});
//# sourceMappingURL=app.6d51520f.js.map