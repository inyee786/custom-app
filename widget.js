(function(){"use strict";(function(){function p(s,{token:d,endpoint:a,target:n}){const o=document.querySelector(n);if(!o){console.error("Target container not found:",n);return}function m(){let t='<div class="callback-form card p-3 shadow-sm">';return s.logo&&(t+=`<div class="text-center mb-3"><img src="${s.logo}" alt="logo" style="max-height:60px;" /></div>`),s.title&&(t+=`<h3 class="text-center">${s.title}</h3>`),s.subtitle&&(t+=`<p class="text-muted text-center">${s.subtitle}</p>`),t+='<form id="callback-form" class="mt-3">',(s.fields||[]).forEach(r=>{const e=r.label?.trim(),l=r.type?.trim();!e||!l||(l==="textarea"?t+=`
              <div class="mb-3">
                <label for="${e}" class="form-label">${e}</label>
                <textarea class="form-control" id="${e}" name="${e}" placeholder="${r.placeholder||""}" ${r.required?"required":""}></textarea>
              </div>
            `:l==="checkbox"?t+=`
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="${e}" name="${e}" ${r.required?"required":""}>
                <label class="form-check-label" for="${e}">${r.description||e}</label>
              </div>
            `:l==="date"||l==="datetime-local"?t+=`
              <div class="mb-3">
                <label for="${e}" class="form-label">${e}</label>
                <input class="form-control" type="${l}" id="${e}" name="${e}" ${r.required?"required":""}>
              </div>
            `:t+=`
              <div class="mb-3">
                <label for="${e}" class="form-label">${e}</label>
                <input class="form-control" type="${l}" id="${e}" name="${e}" placeholder="${r.placeholder||""}" ${r.required?"required":""}>
              </div>
            `)}),t+=`
          <button type="submit" id="submit-btn" class="btn btn-primary w-100">
            <span class="btn-text">Submit</span>
            <span class="btn-loader spinner-border spinner-border-sm" style="display:none;" role="status" aria-hidden="true"></span>
          </button>
          <div id="form-error" class="text-danger mt-2" style="display:none;"></div>
        `,t+="</form>",s.bottomText&&(t+=`<p class="text-muted small mt-3 text-center">${s.bottomText}</p>`),t+="</div>",t}o.innerHTML=m();function b(){const t=document.getElementById("callback-form"),r=document.getElementById("submit-btn"),e=r.querySelector(".btn-text"),l=r.querySelector(".btn-loader"),c=document.getElementById("form-error");t.addEventListener("submit",async y=>{y.preventDefault(),c.style.display="none",r.disabled=!0,e.style.display="none",l.style.display="inline-block";const f=new FormData(t),u={};for(const[i,$]of f.entries())u[i]=$;try{if(!(await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})).ok)throw new Error("Network error");o.innerHTML=`
              <div class="callback-success text-center p-4">
                <div class="mb-3 text-success" style="font-size:40px;">✔</div>
                <p class="lead">Thank you! Your request has been submitted successfully.</p>
                <button id="resubmit-btn" class="btn btn-outline-primary mt-3">Submit another response</button>
              </div>
            `,document.getElementById("resubmit-btn").addEventListener("click",()=>{o.innerHTML=m(),b()})}catch(i){console.error("Form submission failed",i),c.innerText="Submission failed, please try again.",c.style.display="block",r.disabled=!1,e.style.display="inline",l.style.display="none"}})}b()}window.CallbackWidget={init:function({config:s,token:d,endpoint:a,target:n}){if(!s||!a||!n){console.error("Missing required options for CallbackWidget.init");return}p(s,{token:d,endpoint:a,target:n})}}})()})();
