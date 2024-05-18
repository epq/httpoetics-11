let initialScrollPosition = null;

function toArray(obj) {
    return Array.from(obj);
}

function spans(element) {
    function wrapInSpan(a) {
        const childNodeCount = a.childNodes.length;
        const childrenCount = a.children.length;
        if (!childNodeCount) return a;
        if (childNodeCount === 1 && !childrenCount) {
            a.innerHTML = a.textContent.replace(/(\S)/g, "<span>$1</span>");
            return a;
        }
        if (childNodeCount >= childrenCount) {
            const childNodes = toArray(a.childNodes);
            const newNodes = childNodes.reduce(function(newNodes, b) {
                if (b.nodeType === Node.TEXT_NODE) {
                    const clone = a.cloneNode();
                    clone.innerHTML = b.textContent.replace(/(\S)/g, "<span>$1</span>");
                    return newNodes.concat(toArray(clone.childNodes));
                }
                return newNodes.concat(wrapInSpan(b));
            }, []);

            const h = a.cloneNode();
            newNodes.forEach(function(a) {
                h.appendChild(a);
            });
            return h;
        }
    }
    return wrapInSpan(element);
}

function createFaller(b, isFalling) {
    return {
        isFalling,
        duration: 2000,
        span: b
    };
}

function startFall(faller) {
    const a = window.innerHeight; 
    const delta = a - ((faller.span.getBoundingClientRect().top + window.scrollY) - initialScrollPosition);
    faller.span.style.transform = "translateY(0px)";
    faller.span.style.transition = "none";

    requestAnimationFrame(function() {
        faller.span.style.transform = "translateY(" + delta + "px)";
        faller.span.style.transition = "transform " + faller.duration + "ms ease-in";
    });
}

let timeouts = [];

function makeAllSpansFall() {
    const spanElements = document.getElementsByTagName("span");
    for (let i = 0; i < spanElements.length; i++) {
        const faller = createFaller(spanElements[i], true);
        const timeoutId = setTimeout(function() {
            startFall(faller);
        }, Math.random() * 5000);
        timeouts.push(timeoutId);
    }
}

function letsGetIt() {
    initialScrollPosition = window.scrollY;
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(function(a) {
        a.parentNode.replaceChild(spans(a), a);
    });
    makeAllSpansFall();
}

function resetFall() {
    timeouts.forEach(clearTimeout);
    timeouts = [];

    initialScrollPosition = null;

    const spanElements = document.querySelectorAll("span");
    for (let i = spanElements.length - 1; i >= 0; i--) {
        const spanElement = spanElements[i];
        const parentElement = spanElement.parentElement;
        while (spanElement.firstChild) {
            parentElement.insertBefore(spanElement.firstChild, spanElement);
        }
        parentElement.removeChild(spanElement);
    }

    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(function(a) {
        a.style.transform = "";
        a.style.transition = "";
    });
}

let isFalling = false;

function toggleFall() {
    const button = document.getElementById("toggle-button");
    if (isFalling) {
        resetFall();
        isFalling = false;
        button.innerText = "Fall";
    } else {
        letsGetIt();
        isFalling = true;
        button.innerText = "Reset";
    }
}

document.getElementById("toggle-button").addEventListener("click", toggleFall);
