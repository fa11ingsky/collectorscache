import{_ as v,c as a,a as e,F as g,r as d,n as h,t as n,b as _,o as l,d as f,w as k,e as P,f as N,g as x}from"./index.5bb1a88b.js";const C={name:"Products",data(){return{chunks:[],pageNumber:1,items:0,layout:[3,2]}},mounted(){let r=1,t=1,i={};for(let m in this.$root.inventory)i[m]=this.$root.inventory[m],r%this.layout[0]==0&&(i.pageNumber=t,this.chunks.push(i),i={},this.chunks.length%this.layout[1]==0&&t++),r+=1;this.items=r,i.pageNumber=t,this.chunks.push(i)},computed:{maxPage(){return Math.ceil(this.items/(this.layout[0]*this.layout[1]))}},methods:{setPageNumber:function(r){window.scrollTo(0,0);const t={prev:this.pageNumber>1?this.pageNumber-1:this.pageNumber,first:this.pageNumber>1?this.pageNumber-1:this.pageNumber,mid:this.pageNumber>1?this.pageNumber:this.pageNumber+1,last:this.pageNumber>1?this.pageNumber<=this.maxPage-1?this.pageNumber+1:this.pageNumber:this.pageNumber+2,next:this.pageNumber<=this.maxPage-1?this.pageNumber+1:this.pageNumber};this.pageNumber=t[r]},btoa:function(r){return btoa(r)}}},w={class:"container"},y=_('<div class="row"><div class="col-md-12"><div class="product-filters"><ul><li class="active" data-filter="*">All</li><li data-filter=".pokemon">Pokemon</li><li data-filter=".mats">Mats</li></ul></div></div></div>',1),V={class:"product-section"},B={key:0,class:"row product-row"},T={class:"col-md-4 text-center cart-bottom product-width pokemon"},A={key:0,class:"single-product-item"},F={class:"product-image"},M=["src"],S={class:"product-price"},z=["onClick"],D=e("i",{class:"fas fa-shopping-cart"},null,-1),E={class:"row"},L={class:"col-lg-12 text-center"},j={class:"pagination-wrap"};function q(r,t,i,m,s,u){const b=x("router-link");return l(),a("div",w,[y,e("div",V,[(l(!0),a(g,null,d(s.chunks,o=>(l(),a("div",null,[s.pageNumber==o.pageNumber?(l(),a("div",B,[(l(!0),a(g,null,d(o,(c,p)=>(l(),a("div",T,[p!="pageNumber"?(l(),a("div",A,[e("div",F,[f(b,{to:"/info/"+c.url},{default:k(()=>[e("img",{src:"img/products/"+c.img},null,8,M)]),_:2},1032,["to"])]),e("h3",null,n(p),1),e("p",S," $"+n(c.price),1),e("a",{class:"cart-btn",onClick:G=>r.$root.addToCart(p)},[D,P(" Add to Cart")],8,z)])):N("",!0)]))),256))])):N("",!0)]))),256)),e("div",E,[e("div",L,[e("div",j,[e("ul",null,[e("li",null,[e("a",{onClick:t[0]||(t[0]=o=>u.setPageNumber("prev"))},"Prev")]),e("li",null,[e("a",{class:h(s.pageNumber==1?"active":""),onClick:t[1]||(t[1]=o=>u.setPageNumber("first"))},n(s.pageNumber>1?s.pageNumber-1:s.pageNumber),3)]),e("li",null,[e("a",{class:h(s.pageNumber!=1&&s.pageNumber!=u.maxPage+1?"active":""),onClick:t[2]||(t[2]=o=>u.setPageNumber("mid"))},n(s.pageNumber>1?s.pageNumber:s.pageNumber+1),3)]),e("li",null,[e("a",{onClick:t[3]||(t[3]=o=>u.setPageNumber("last"))},n(s.pageNumber>1?s.pageNumber+1:s.pageNumber+2),1)]),e("li",null,[e("a",{onClick:t[4]||(t[4]=o=>u.setPageNumber("next"))},"Next")])])])])])])])}const I=v(C,[["render",q]]);export{I as default};
