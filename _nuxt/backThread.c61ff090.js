(function(){"use strict";addEventListener("message",t=>{let e=t.data;for(;!(e%2n);)postMessage(2n),e/=2n;let s=3n;e:for(;e!==1n;){const a=calSqrt(e);for(;s<a;s+=2n)if(!(e%s)){postMessage(s),e/=s;continue e}postMessage(e);break}postMessage(!1)})})();