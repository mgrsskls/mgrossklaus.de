class WebMentions extends HTMLElement {
	constructor() {
		super();

		fetch(
			`https://webmention.io/api/mentions.jf2?target=https://www.mgrossklaus.de${this.getAttribute(
				"path"
			)}`
		)
			.then((response) => response.json())
			.then((json) => {
				this.results = {
					reposts: json.children.filter(
						(child) => child["wm-property"] === "repost-of"
					),
					likes: json.children.filter(
						(child) => child["wm-property"] === "like-of"
					),
					replies: json.children.filter(
						(child) => child["wm-property"] === "in-reply-to"
					),
				};
				this.render(json);
			})
			.catch((e) => console.error(e.toString()));
	}

	render({ children }) {
		if (children.length === 0) return;

		const element = document.createElement("div");

		element.classList.add("WebMentions");

		element.innerHTML = "";

		if (this.results.reposts.length > 0) {
			element.innerHTML += this.getSimpleHtml(
				this.results.reposts,
				"repost",
				"reposts"
			);
		}

		if (this.results.likes.length > 0) {
			element.innerHTML += this.getSimpleHtml(
				this.results.likes,
				"like",
				"likes"
			);
		}

		if (this.results.replies.length > 0) {
			element.innerHTML += `
				${this.getHeadingHtml(this.results.replies.length, "reply", "replies")}
				<ol class="WebMentions-list WebMentions-list--replies">
					${this.getReplies(this.results.replies)}
				</ol>
			`;
		}

		this.appendChild(element);
	}

	getSimpleHtml(list, headingSingular, headingPlural) {
		return `
			${this.getHeadingHtml(list.length, headingSingular, headingPlural)}
			<ol class="WebMentions-list WebMentions-list--simple">
				${list
					.map(
						(item) => `
						<li class="WebMentions-item">
							<a href="${item.url}">
								<img class="WebMention-img" src="${item.author.photo}" alt="${item.author.name}">
							</a>
						</li>
					`
					)
					.join("")}
			</ol>
		`;
	}

	getHeadingHtml(length, headingSingular, headingPlural) {
		return `<h2 class="WebMentions-type">${length} ${
			length === 1 ? headingSingular : headingPlural
		}</h2>`;
	}

	getReplies(children) {
		let html = "";

		children.forEach((webMention) => {
			html += `
				<li class="WebMentions-item">
					${this.getReplyHtml({
						author: webMention.author,
						text: webMention.content?.html,
					})}
				</li>
			`;
		});

		return html;
	}

	getReplyHtml({ author, text }) {
		return `
			<div class="WebMention">
				<div class="WebMention-header">
					<img class="WebMention-img" src="${author.photo}" alt="" aria-hidden="true">
					<a href="${author.url}">
						${author.name}
					</a>
				</div>
				<div class="WebMention-content">
					${text}
				</div>
			</div>
		`;
	}
}

customElements.define("mg-webmentions", WebMentions);
