class WebMentions extends HTMLElement {
	constructor() {
		super();

		fetch(
			`https://webmention.io/api/mentions.jf2?target=https://www.mgrossklaus.de${this.getAttribute(
				"path"
			)}`
		)
			.then((response) => response.json())
			.then((json) => this.render(json))
			.catch((e) => console.error(e.toString()));
	}

	render({ children }) {
		if (children.length === 0) return;

		const element = document.createElement("div");

		element.classList.add("WebMentions");

		element.innerHTML = `
      <h2 class="WebMentions-heading">Webmentions</h2>
      <ol class="WebMentions-list">
        ${this.getItems(children)}
      </ol>
    `;

		this.appendChild(element);
	}

	getItems(children) {
		let html = "";

		children.forEach((webMention) => {
			console.log(webMention);
			html += `
        <li class="WebMentions-item">
          ${this.getHtml({
						author: webMention.author,
						type: webMention["wm-property"],
						url: webMention.url,
						text: webMention.content?.html,
					})}
        </li>
      `;
		});

		return html;
	}

	getHtml({ author, type, url, text }) {
		return `
      <div class="WebMention">
        <div class="WebMention-header">
          <img src="${author.photo}" alt="" aria-hidden="true">
          <a href="${author.url}">
            ${author.name}
          </a>
        </div>
        <div class="WebMention-content">
          ${this.getContent({ type, url, text })}
        </div>
      </div>
    `;
	}

	getContent({ type, url, text }) {
		if (type === "like-of") {
			return `<p><i>liked via <a href="${url}">${url}</a></i></p>`;
		}

		if (type === "in-reply-to") {
			return text;
		}

		if (type === "repost-of") {
			return `<p><i>reposted via <a href="${url}">${url}</a></i></p>`;
		}
	}
}

customElements.define("mg-webmentions", WebMentions);
