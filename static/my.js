class ExampleTranscription extends HTMLElement {
    constructor() {
        super();

        const img = this.getAttribute("img");
        const alt = this.getAttribute("alt");
        const extraTitle = this.getAttribute("extraTitle");
        const transcript = this.innerHTML;
        this.innerHTML = "";

        let transcriptionTitle = extraTitle ? "Image Transcription: " + extraTitle : "Image Transcription";

        let content = document.createElement('div');
        content.innerHTML = `
            <h2 class="mt-4">Example:</h2>
            <div class="card d-flex flex-column d-none d-md-block">
                <div class="row row-0 flex-fill">
                    <div class="col-md-3">
                        <a href="${img}">
                            <img
                                    src="${img}"
                                    class="w-100 h-100 object-cover"
                                    alt="${alt}"
                                    data-bilderrahmen="gallery-${Math.floor(Math.random() * 10000)}"
                            />
                        </a>
                    </div>
                    <div class="col">
                        <div class="card-body">
                            <h3 class="card-title"><em>${transcriptionTitle}</em></h3>
                            <div class="text-muted">
                                ${transcript}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card d-flex flex-column d-sm-block d-md-none">
                <a href="${img}">
                    <img 
                        class="card-img-top"
                        src="${img}"
                        alt="${alt}"
                        data-bilderrahmen="gallery-${Math.floor(Math.random() * 10000)}"
                    />
                </a>
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title"><em>${transcriptionTitle}</em></h3>
                    <div class="text-muted">
                        ${transcript}
                    </div>
                </div>
            </div>
        `
        setTimeout(() => {
            document.getElementById("transcriptionContainer").appendChild(content);
        });
    }
}

function copyToClipboard(that) {
    let format = that.parentElement.previousElementSibling.innerHTML.replace(
        /(^[^\S\r\n]+)/gm, ""  // fix leading spaces
    )
        .replaceAll('&gt;', '>')
        .replaceAll('&lt;', '<')
        .replaceAll('&amp;', '&');
    navigator.clipboard.writeText(format);
    Toastify({
        text: "Copied!",
        duration: 1500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
        },
        onClick: function () {
        } // Callback after click
    }).showToast();
}

class FormatBlock extends HTMLElement {
    constructor() {
        super();
        let content = document.createElement('div');
        const format = this.innerHTML;
        const name = this.getAttribute("name");
        const formatTitle = name ? "Format: " + name : "Format";
        this.innerHTML = "";
        content.innerHTML = `
        <h2 class="mt-4">${formatTitle}</h2>
        <pre>${format}</pre>
        <div class="text-center">
            <div class="btn btn-secondary" onclick="copyToClipboard(this)">Copy Format</div>
        </div>
        `
        setTimeout(() => {
            document.getElementById("formatContainer").appendChild(content);
        });
    }
}

class BackButton extends HTMLElement {
    constructor() {
        super();

        let content = document.createElement('div');
        content.innerHTML = `
            <div class="text-center mt-5">
                <a
                        href="../images.html"
                        class="btn btn-dark text-uppercase"
                >Back to Image Templates</a>
                <a
                        href="../index.html"
                        class="btn btn-outline-danger text-uppercase mt-2 mt-sm-0"
                >Back to Home</a>
            </div>
        `
        this.appendChild(content);
    }
}

class Page extends HTMLElement {
    constructor() {
        super();
        const name = this.getAttribute("name");
        const pagetitle = document.getElementsByTagName('title')[0];

        pagetitle.innerText = `${name} - TranscribersOfReddit`;

        const description = document.getElementsByTagName('description')[0];
        const container = document.createElement('div');

        let descriptiontext;

        if (description.innerHTML === "") {
            descriptiontext = "";
        } else {
            descriptiontext = "<p>" + description.innerHTML + "</p>";
        }

        container.innerHTML = `
<div class="container my-5">
    <h1 class="text-center">${name}</h1>
    <div class="row">
        <div class="col-0 col-lg-2"></div>
        <div class="col-12 col-lg-8">
            <div class="fs-2">
                <p class="text-center">
                    This template extends our general guidelines. Find them below:
                <div class="text-center">
                    <a href="../guidelines.html" class="btn btn-primary text-uppercase text-center">Guidelines</a>
                </div>
                </p>
                <p>
                    Please attempt to give a general idea of what the image is. Add as much detail
                    as you feel is necessary, but be descriptive. Imagine describing it to someone
                    who can't see the picture.
                </p>
                <p><strong>NOTE: The template shows how to format the content, not which order you
                    have to follow to transcribe a post!</strong> If you're not sure where to start,
                    give a brief overview then consider what first drew your attention; that's
                    probably a good place to start!
                </p>
                <hr>
                ${descriptiontext}
                <div id="formatContainer"></div>
                <div id="transcriptionContainer"></div>
            </div>
            <back-button></back-button>
        </div>
        <div class="col-0 col-lg-2"></div>
    </div>
</div>
        `
        this.appendChild(container);
        require(
            [
                '../static/vendored/bilderrahmen.umd.es5.js',
                '../static/vendored/tabler.min.js',
                '../static/vendored/toastify.min.js',
            ], function (
                module,
                tabler,
                toastify,
            ) {
                new module.Bilderrahmen({closeOnOutsideClick: true});
            });
    }
}

customElements.define('example-transcription', ExampleTranscription)
customElements.define('format-block', FormatBlock)
customElements.define('back-button', BackButton)
customElements.define('build-page', Page)
