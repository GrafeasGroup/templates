class ExampleTranscription extends HTMLElement {
    constructor() {
        super();

        const img = this.getAttribute("img");
        const transcript = this.getAttribute("transcription");

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
                                    alt=${transcript}
                            />
                        </a>
                    </div>
                    <div class="col">
                        <div class="card-body">
                            <h3 class="card-title"><em>Image Transcription</em></h3>
                            <div class="text-muted">
                                [<em>${transcript}</em>]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card d-flex flex-column d-sm-block d-md-none">
                <a href=${img}>
                    <img class="card-img-top" src=${img} alt=${transcript}/>
                </a>
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title"><em>Image Transcription</em></h3>
                    <div class="text-muted">
                        [<em>${transcript}</em>]
                    </div>
                </div>
            </div>
        `
        this.appendChild(content);
    }
}

class FormatBlock extends HTMLElement {
    constructor() {
        super();
        const format = this.getAttribute("format");
        let content = document.createElement('div');
        content.innerHTML = `
        <h2>Format:</h2>
        <pre>${format}</pre>
        `
        this.appendChild(content);
    }
}

class BackButton extends HTMLElement {
    constructor() {
        super();

        let content = document.createElement('div');
        content.innerHTML = `
            <div class="text-center">
                <a
                        href="/images.html"
                        class="btn btn-outline-primary text-uppercase my-5"
                >Back to Image Templates</a>
            </div>
        `
        this.appendChild(content);
    }
}

class Page extends HTMLElement {
    constructor() {
        super();
        const title = this.getAttribute("title");
        const pagetitle = document.getElementsByTagName('title')[0];

        pagetitle.innerText = `${title} - TranscribersOfReddit`;
        
        const description = document.getElementsByTagName('description')[0];
        const format = document.getElementsByTagName('format')[0];
        const img = document.getElementsByTagName('example-image')[0];
        const transcription = document.getElementsByTagName('transcription')[0];
        const container = document.createElement('div');
        container.innerHTML = `
<div class="container mt-5">
    <h1 class="text-center">${title}</h1>
    <div class="row">
        <div class="col-0 col-lg-2"></div>
        <div class="col-12 col-lg-8">
            <div class="fs-2">
                <p class="text-center">
                    This template extends our general guidelines. Find them below:
                <div class="text-center">
                    <a href="#" class="btn btn-primary text-uppercase text-center">Guidelines</a>
                </div>
                </p>
                <p>
                ${description.innerHTML}
                </p>
                <format-block
                    format="${format.innerText}"
                >
                </format-block>
                <example-transcription
                    img="${img.innerText}"
                    transcription="${transcription.innerText}"
                >
                </example-transcription>
            </div>
            <back-button></back-button>
        </div>
        <div class="col-0 col-lg-2"></div>
    </div>
</div>
        `
        this.appendChild(container);
    }
}
customElements.define('example-transcription', ExampleTranscription)
customElements.define('format-block', FormatBlock)
customElements.define('back-button', BackButton)
customElements.define('build-page', Page)
