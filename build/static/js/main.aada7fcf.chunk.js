(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(15),c=n.n(r),u=(n(20),n(6)),o=n(3),s=n(0),i=function(e){var t=e.cInfo,n=e.handleDelete;return Object(s.jsxs)("p",{children:[Object(s.jsxs)("span",{children:[t.name," : ",t.number]})," ",Object(s.jsx)("button",{className:"deleteBtn",onClick:function(){return n(t.id)},children:"Delete"})]})},l=function(e){var t=e.contacts,n=e.handleDelete;return Object(s.jsx)("div",{className:"contacts",children:t.map((function(e){return Object(s.jsx)(i,{cInfo:e,handleDelete:n},e.id)}))})},d=function(e){var t=e.search,n=e.handleInput;return Object(s.jsxs)("div",{className:"filter",children:[Object(s.jsx)("header",{children:"Search Contact"}),Object(s.jsx)("input",{type:"text",value:t,onChange:n})]})},m=function(e){return Object(s.jsx)("div",{className:"form-wrapper",children:Object(s.jsxs)("form",{onSubmit:e.handleForm,children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("header",{children:"Name"}),Object(s.jsx)("input",{type:"text",value:e.name,onChange:e.handleNameInput}),Object(s.jsx)("header",{children:"Number"}),Object(s.jsx)("input",{type:"text",value:e.number,onChange:e.handleNumberInput})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"Add Contact"})})]})})},b=n(4),f=n.n(b),j="/api/contacts",h={getAll:function(){return f.a.get(j).then((function(e){return e.data}))},create:function(e){return f.a.post(j,e).then((function(e){return e.data}))},update:function(e,t){return f.a.put("".concat(j,"/").concat(e),t).then((function(e){return e.data}))},deleteOne:function(e){return f.a.delete("".concat(j,"/").concat(e)).then((function(e){return console.log(e),e}))}},p=function(e){var t=e.message,n="";switch(e.type){case"added":case"success":n="green";break;case"updated":case"warning":n="orange";break;case"deleted":case"error":n="red";break;default:n="black"}var a={color:n,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginTop:15,marginBottom:15};return null===t?null:Object(s.jsx)("div",{className:"notification",style:a,children:t})};var O=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(o.a)(c,2),b=i[0],f=i[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),g=O[0],x=O[1],v=Object(a.useState)(""),y=Object(o.a)(v,2),w=y[0],N=y[1],C=Object(a.useState)({message:null,type:null}),k=Object(o.a)(C,2),I=k[0],S=k[1];Object(a.useEffect)((function(){h.getAll().then((function(e){return r(e)})).catch((function(e){S({message:"Error Loading Contacts",type:"error"}),setTimeout((function(){return S({message:null,type:null})}),2e3)}))}),[]);var T=""===w?n:n.filter((function(e){return e.name.toLocaleLowerCase().includes(w.toLowerCase())}));return Object(s.jsxs)("div",{className:"app-main",children:[Object(s.jsx)("h1",{children:"Phonebook \ud83d\udcd6"}),Object(s.jsx)(p,{message:I.message,type:I.type}),Object(s.jsx)(d,{search:w,handleInput:function(e){return N(e.target.value)}}),Object(s.jsx)("h1",{children:"Add New Contact \u2795"}),Object(s.jsx)(m,{name:b,number:g,handleForm:function(e){e.preventDefault();var t,a={name:b,number:g},c=(t=a,n.filter((function(e){return e.name.toLowerCase()===t.name.toLowerCase()})));if(0!==c.length){var o=c[0],s=window.confirm('"'.concat(o.name,'" Already Exists - Update Their Phone Number?')),i=Object(u.a)(Object(u.a)({},o),{},{number:a.number});s&&h.update(o.id,i).then((function(e){r(n.map((function(t){return t.id!==i.id?t:e}))),S({message:"Updated ".concat(i.name),type:"updated"}),setTimeout((function(){return S({message:null,type:null})}),2e3),f(""),x("")})).catch((function(e){var t=e.response.data.error;S({message:"".concat(t),type:"error"}),setTimeout((function(){return S({message:null,type:null})}),4e3)}))}else h.create(a).then((function(e){r(n.concat(e)),S({message:"Added ".concat(e.name),type:"added"}),setTimeout((function(){return S({message:null,type:null})}),2e3),f(""),x("")})).catch((function(e){var t=e.response.data.error;S({message:"".concat(t),type:"error"}),setTimeout((function(){return S({message:null,type:null})}),4e3)}))},handleNameInput:function(e){return f(e.target.value)},handleNumberInput:function(e){return x(e.target.value)}}),Object(s.jsx)("h1",{children:"Contacts \ud83d\udc65"}),Object(s.jsx)(l,{contacts:T,handleDelete:function(e){var t=n.find((function(t){return t.id===e}));window.confirm("Delete ".concat(t.name,"?"))&&h.deleteOne(e).then((function(a){r(n.filter((function(t){return t.id!==e}))),S({message:"Deleted ".concat(t.name),type:"deleted"}),setTimeout((function(){return S({message:null,type:null})}),2e3)})).catch((function(a){r(n.filter((function(t){return t.id!==e}))),S({message:"Information of ".concat(t.name," has already been removed from server"),type:"error"}),setTimeout((function(){return S({message:null,type:null})}),2e3)}))}})]})};c.a.render(Object(s.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.aada7fcf.chunk.js.map