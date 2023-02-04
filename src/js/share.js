class Share extends HTMLElement {
	constructor() {
		super();

		if ("share" in navigator) {
			const button = document.createElement("button");

			button.textContent = "Share";
			button.addEventListener("click", () => {
				try {
					navigator.share({
						text: this.getAttribute("text"),
						url: this.getAttribute("url"),
					});
				} catch (e) {
					console.error(e.toString());
				}
			});

			this.appendChild(button);
		} else {
			this.remove();
		}
	}
}

customElements.define("mg-share", Share);
