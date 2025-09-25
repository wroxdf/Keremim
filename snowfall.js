/*
* Snowfall.js
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function() {
    'use strict';

    var defaults = {
        flakeCount: 100,
        minFlakeSize: 1,
        maxFlakeSize: 5,
        minSpeed: 1,
        maxSpeed: 3,
        flakeColor: '#fff',
        zIndex: 9999
    };

    var container;
    var flakes = [];
    var animationFrameId;

    function init(options) {
        options = Object.assign({}, defaults, options);

        container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:' + options.zIndex + ';';
        document.body.appendChild(container);

        for (var i = 0; i < options.flakeCount; i++) {
            flakes.push(createFlake(options));
        }

        animate();
    }

    function createFlake(options) {
        var size = Math.random() * (options.maxFlakeSize - options.minFlakeSize) + options.minFlakeSize;
        var flake = document.createElement('div');
        flake.style.cssText = 'position:absolute;background-color:' + options.flakeColor + ';border-radius:50%;';
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.opacity = Math.random();
        
        resetFlake(flake, options);

        container.appendChild(flake);
        return flake;
    }

    function resetFlake(flake, options) {
        var speed = Math.random() * (options.maxSpeed - options.minSpeed) + options.minSpeed;
        var x = Math.random() * window.innerWidth;
        var y = -10;

        flake.style.top = y + 'px';
        flake.style.left = x + 'px';
        flake.speed = speed;
    }

    function animate() {
        for (var i = 0; i < flakes.length; i++) {
            var flake = flakes[i];
            var newY = parseFloat(flake.style.top) + flake.speed;
            
            if (newY > window.innerHeight) {
                resetFlake(flake, defaults);
            } else {
                flake.style.top = newY + 'px';
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    function destroy() {
        cancelAnimationFrame(animationFrameId);
        if (container) {
            container.parentNode.removeChild(container);
            flakes = [];
        }
    }

    if (typeof window !== 'undefined') {
        window.snowfall = {
            init: init,
            destroy: destroy
        };
    }
})();

// Initialize snowfall with default options when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    snowfall.init();
});