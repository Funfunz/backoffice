(this.webpackJsonpbackoffice=this.webpackJsonpbackoffice||[]).push([[7],{119:function(l,e,c){l.exports={columns:"style_columns__3PFqz",columnsNoWrap:"style_columnsNoWrap__2A196",columnsGap1:"style_columnsGap1__youay",column:"style_column__2pqat",columnsGap2:"style_columnsGap2__y9z89",col1:"style_col1__2KIV9",col2:"style_col2__3LC04",col3:"style_col3__1pDBR",col4:"style_col4__t7s-2",col5:"style_col5__3vduO",col6:"style_col6__2t5-O",col7:"style_col7__8-iEk",col8:"style_col8__2XI0u",col9:"style_col9__1oH2Y",col10:"style_col10__3YPUn",col11:"style_col11__2YxmP",col12:"style_col12__1ebVJ",colAuto:"style_colAuto__1akUX",colGrow:"style_colGrow__1Jivi",colxs1:"style_colxs1__8nxaR",colxs2:"style_colxs2__3JQuM",colxs3:"style_colxs3__1yzJo",colxs4:"style_colxs4__2P-BU",colxs5:"style_colxs5__WSPvX",colxs6:"style_colxs6__NsKam",colxs7:"style_colxs7__EpunF",colxs8:"style_colxs8__3tDGX",colxs9:"style_colxs9__TMgoE",colxs10:"style_colxs10__ft6_o",colxs11:"style_colxs11__1D3xM",colxs12:"style_colxs12__1jczt",colsm1:"style_colsm1__p4qnv",colsm2:"style_colsm2__1qfqv",colsm3:"style_colsm3__1SOma",colsm4:"style_colsm4__2c75R",colsm5:"style_colsm5__17Nph",colsm6:"style_colsm6__2l9zc",colsm7:"style_colsm7__32zrI",colsm8:"style_colsm8__3GdZN",colsm9:"style_colsm9__3HWzE",colsm10:"style_colsm10__1n1Xp",colsm11:"style_colsm11__9zEDh",colsm12:"style_colsm12__2m7E_",colmd1:"style_colmd1__132_j",colmd2:"style_colmd2__3yzWA",colmd3:"style_colmd3__2MGkE",colmd4:"style_colmd4__2hvXS",colmd5:"style_colmd5__2zVL-",colmd6:"style_colmd6__OH6qU",colmd7:"style_colmd7__u0IUv",colmd8:"style_colmd8__2lrJd",colmd9:"style_colmd9__3mxIg",colmd10:"style_colmd10__PL-xj",colmd11:"style_colmd11__1MvKx",colmd12:"style_colmd12__2UmZd",collg1:"style_collg1__172_K",collg2:"style_collg2__2Y0ud",collg3:"style_collg3__3nQ8c",collg4:"style_collg4__3WBH4",collg5:"style_collg5___DDK-",collg6:"style_collg6__ebfHq",collg7:"style_collg7__3L0dt",collg8:"style_collg8__24jW4",collg9:"style_collg9__1YFAu",collg10:"style_collg10__2t013",collg11:"style_collg11__B4VeY",collg12:"style_collg12__3GKZS",colxl1:"style_colxl1__12RhI",colxl2:"style_colxl2__3j922",colxl3:"style_colxl3__34nQx",colxl4:"style_colxl4__1s7iT",colxl5:"style_colxl5__2SuUU",colxl6:"style_colxl6__2zPeC",colxl7:"style_colxl7__1KMrD",colxl8:"style_colxl8__HVgbo",colxl9:"style_colxl9__1u1i_",colxl10:"style_colxl10__gJ5-i",colxl11:"style_colxl11__1Qj-x",colxl12:"style_colxl12__3v9GX",titlePage:"style_titlePage__1CzD6",editTableContainer:"style_editTableContainer__34wRU",actions:"style_actions__2EuKi",actionButton:"style_actionButton__oWde8"}},123:function(l,e,c){"use strict";c.r(e);var t=c(14),_=c.n(t),o=c(22),s=c(10),a=c(4),n=c(1),i=c(0),r=c(2),y=c(73),u=c(66),b=c(74),m=c(69),j=c(75),d=c(60),x=c(119),O=c.n(x),f={edit:"Edit entry",new:"New entry",view:"View entry"},v=function(){var l=Object(r.h)(),e=l.entityName,c=l.id,t=l.view,x=Object(r.f)(),v=Object(u.a)(e),p=Object(y.a)(v,isNaN(c)?c:Number(c)),g=p.entry,h=p.setEntry,N=p.saveEntry,w=Object(i.useCallback)((function(l,e){h((function(c){return Object(a.a)(Object(a.a)({},c),{},Object(s.a)({},l,e))}))}),[h]),k=Object(i.useCallback)((function(){x.push("/list/".concat(e))}),[x,e]),C=Object(i.useCallback)(Object(o.a)(_.a.mark((function l(){return _.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,N();case 2:k();case 3:case"end":return l.stop()}}),l)}))),[N,k]);return Object(n.jsxs)("div",{className:O.a.editTable,children:[Object(n.jsx)("div",{className:O.a.titlePage,children:Object(n.jsx)(d.a,{text:f[t]})}),Object(n.jsxs)("div",{className:O.a.editTableContainer,children:[Object(n.jsx)(j.b,{children:Object(b.a)(v,t).map((function(l,e){var c=l.Component,_=l.props;return Object(n.jsx)(j.a,{size:6,children:Object(n.jsx)(c,Object(a.a)(Object(a.a)({},_),{},{readOnly:_.readOnly||"view"===t,onChange:w,value:g[_.name]||""}))},e)}))}),Object(n.jsxs)("div",{className:O.a.actions,children:[Object(n.jsx)(m.a,{type:"goback",onClick:k,label:"view"===t?"GO BACK":"CANCEL"}),"view"===t?Object(n.jsx)(m.a,{type:"save",label:"EDIT",navigateTo:"/edit/".concat(e,"/").concat(c)}):Object(n.jsx)(m.a,{type:"save",label:"SAVE",onClick:C})]})]})]})};e.default=Object(i.memo)(v)},60:function(l,e,c){"use strict";var t=c(1),_=c(0),o=c(61),s=c.n(o),a=function(l){return Object(t.jsx)("h1",{className:s.a.pageTitle,children:l.text})};e.a=Object(_.memo)(a)},61:function(l,e,c){l.exports={pageTitle:"style_pageTitle__16scT"}},62:function(l,e,c){"use strict";var t=c(10),_=c(1),o=c(0),s=c(2),a=c(21),n=c.n(a),i=c(64),r=c.n(i),y=function(l){var e,c=l.active,a=void 0!==c&&c,i=l.disabled,y=l.prefix,u=l.label,b=l.suffix,m=l.rounded,j=l.color,d=l.onClick,x=l.navigateTo,O=l.style,f=l.children,v=l.className,p=n()([r.a.button,v,(e={},Object(t.a)(e,r.a[j||""],j),Object(t.a)(e,r.a.rounded,m),Object(t.a)(e,r.a.active,a),e)]),g=Object(s.f)(),h=Object(o.useCallback)((function(l){x?g.push(x):d&&d(l)}),[x,d,g]);return Object(_.jsxs)("button",{onClick:h,className:p,type:"button",style:O,disabled:i,children:[y?Object(_.jsx)("span",{className:r.a.prefix,children:y}):null,u?Object(_.jsxs)("span",{className:"label",children:[" ",u," "]}):null,b?Object(_.jsx)("span",{className:r.a.suffix,children:b}):null,f]})};e.a=Object(o.memo)(y)},63:function(l,e,c){"use strict";var t=c(10),_=c(1),o=c(0),s=c(21),a=c.n(s),n=function(l){var e,c=l.name,o=l.fixedWidth,s=void 0===o||o,n=a()((e={fas:!0},Object(t.a)(e,"fa-".concat(c),c),Object(t.a)(e,"fa-fw",s),e));return Object(_.jsx)("i",{className:n})};e.a=Object(o.memo)(n)},64:function(l,e,c){l.exports={button:"style_button__2NB1i",primary:"style_primary__3dZOU",active:"style_active__2SwIc",secondary:"style_secondary__3s6Bs",danger:"style_danger__7zw80",warning:"style_warning__bKP17",info:"style_info__30-nm",success:"style_success__1_oUf",delete:"style_delete__2jqJ4",cancel:"style_cancel__24IdD",edit:"style_edit__33cnB",rounded:"style_rounded__lYnO1",prefix:"style_prefix__3Z5_K",suffix:"style_suffix__1uAX3"}},65:function(l,e,c){l.exports={row:"style_row__22WBU",center:"style_center__2tUMk",col:"style_col__2XQ_3","col-1":"style_col-1__15i8Q","col-2":"style_col-2__3r2Yn","col-3":"style_col-3__26GQO","col-4":"style_col-4__jAhWG","col-5":"style_col-5__-t--T","col-6":"style_col-6__ombs5","col-7":"style_col-7__3DuU4","col-8":"style_col-8__1Tl7G","col-9":"style_col-9__2PyQW","col-10":"style_col-10__1207X","col-11":"style_col-11__23KmZ","col-12":"style_col-12__1TuSn"}},69:function(l,e,c){"use strict";var t=c(4),_=c(1),o=c(0),s=c(62),a=c(63),n=c(70),i=c.n(n);var r=function(l){var e=l.type,c=l.onClick,o=l.label,n=l.navigateTo;return Object(_.jsx)(s.a,Object(t.a)(Object(t.a)({className:i.a.actionButton},function(l){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";switch(l){case"goback":return{prefix:Object(_.jsx)(a.a,{name:"chevron-left"}),color:"cancel",label:e};case"save":return{prefix:Object(_.jsx)(a.a,{name:"save"}),color:"primary",label:e};case"edit":return{prefix:Object(_.jsx)(a.a,{name:"pen"}),color:"edit",label:e};case"delete":return{prefix:Object(_.jsx)(a.a,{name:"trash-alt"}),color:"delete",label:e};case"view":default:return{prefix:Object(_.jsx)(a.a,{name:"eye"}),label:e}}}(e,o)),{},{navigateTo:n,onClick:c}))};e.a=Object(o.memo)(r)},70:function(l,e,c){l.exports={actionButton:"style_actionButton__2CGMn"}},73:function(l,e,c){"use strict";c.d(e,"a",(function(){return a}));var t=c(10),_=c(11),o=c(0),s=c(68);function a(l,e){var c=Object(o.useState)({}),a=Object(_.a)(c,2),n=a[0],i=a[1],r=Object(o.useState)({}),y=Object(_.a)(r,2),u=y[0],b=y[1],m=Object(o.useState)(!1),j=Object(_.a)(m,2),d=j[0],x=j[1],O=Object(o.useState)(!1),f=Object(_.a)(O,2),v=f[0],p=f[1],g=Object(o.useMemo)((function(){return"string"===typeof e||"number"===typeof e?Object(t.a)({},null===l||void 0===l?void 0:l.getPk(),e):e}),[e,l]),h=Object(o.useState)({}),N=Object(_.a)(h,2),w=N[0],k=N[1],C=Object(o.useCallback)((function(){return((null===l||void 0===l?void 0:l.getName())!==w.entity||!Object(s.b)(g,w.filter))&&(k({entity:null===l||void 0===l?void 0:l.getName(),filter:g}),!0)}),[l,w,g]);Object(o.useEffect)((function(){!C()||d||v||Object(s.b)(n,g)||!l||(x(!0),Object(s.d)(l,g).then((function(l){x(!1),l&&Object(s.c)(l,g)?(i(l),b(l),p(!1)):p(!0)})).catch((function(){x(!1),p(!0)})))}),[l,d,g,v,n,C]);var z=Object(o.useCallback)((function(){return Object(s.e)(l,Object(s.a)(n,u),g)}),[l,g,u,n]);return{entry:u,setEntry:b,saveEntry:z,error:v}}},75:function(l,e,c){"use strict";c.d(e,"b",(function(){return u})),c.d(e,"a",(function(){return y}));var t=c(1),_=c(0),o=c(65),s=c.n(o),a=c(10),n=c(21),i=c.n(n),r=function(l){var e,c=l.size,_=l.sizeSm,o=l.sizeMd,n=l.sizeLg,r=l.sizeXl,y=l.children,u=i()((e={},Object(a.a)(e,s.a["col-".concat(c)],!!c),Object(a.a)(e,s.a["col-sm-".concat(_)],!!_),Object(a.a)(e,s.a["col-md-".concat(o)],!!o),Object(a.a)(e,s.a["col-lg-".concat(n)],!!n),Object(a.a)(e,s.a["col-xl-".concat(r)],!!r),e));return Object(t.jsx)("div",{className:u,children:y})},y=Object(_.memo)(r),u=function(l){var e=l.children;return Object(t.jsx)("div",{className:s.a.row,children:e})}}}]);
//# sourceMappingURL=7.df9d3868.chunk.js.map