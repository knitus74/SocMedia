!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}({13:function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var a=null;document.addEventListener("DOMContentLoaded",function(){var e=new XMLHttpRequest;e.open("GET","/getcomments",!0),e.send(),e.onload=function(){a=JSON.parse(e.responseText),console.log(JSON.stringify(a)),ReactDOM.render(React.createElement(l,null),document.getElementById("commentstream"))}});var l=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=function(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?i(e):t}(this,u(t).call(this,e))).state={comments:a},n.handleDelete=n.handleDelete.bind(i(i(n))),n.handlePost=n.handlePost.bind(i(i(n))),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,React.Component),function(e,t,n){t&&r(e.prototype,t),n&&r(e,n)}(t,[{key:"handlePost",value:function(e){}},{key:"handleDelete",value:function(e){var t=e.target.parentNode.id,n=new XMLHttpRequest;n.open("POST","/deletecomment",!0),n.setRequestHeader("Content-Type","application/json");var o=JSON.stringify({comment_id:t});n.send(o),this.setState({comments:this.state.comments.filter(function(e){return e.commentid!=t})})}},{key:"render",value:function(){var e=this,t=this.state.comments.map(function(t,n){return React.createElement("div",{id:t.commentid,key:n},React.createElement("p",null,t.comment)," ",React.createElement("button",{onClick:e.handleDelete},"Delete"))});return React.createElement("div",null,React.createElement("form",{onSubmit:this.handlePost,method:"POST",action:""},React.createElement("textarea",{rows:"3",cols:"50"}),React.createElement("button",{type:"submit"},"Submit")),t)}}]),t}()}});