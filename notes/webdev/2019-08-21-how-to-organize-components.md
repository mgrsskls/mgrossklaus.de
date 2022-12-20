---
title: How to organize components
blog: true
---

```html
<button type="submit">foo</button>
```

Probably the most popular way of organizing your components is <a href="http://bradfrost.com/blog/post/atomic-web-design/" rel="noopener">Atomic Design</a> which was introduced by Brad Frost. I recently talked to a client of mine who said that they were succesfully using this methodology in all their projects and that it works really well for them. We had a short discussion about it as I was using it for a little bit as well, but was realizing pretty quickly that it would just not work for me. One reason for that is the following example: let's say you have two atoms; a button and an icon. If a button could also have an icon included, you would include an atom in another atom. While you could of course do that, it simply feels wrong to me (there are also no atoms in atoms in the nature, are there?).<br>
That is just one example for why I came up with my own way of organizing my components.

Of course, this is an ongoing process and every project is different, but I basically follow these rules:

## Which directories should I use?

- <b>templates</b><br>The actual page templates.
- <b>content</b><br>Content components, which can be picked by the editors to fill pages with content.
- <b>components</b><br>All the remaining components that should not be used directly by editors (usually something like icons, buttons, etc.).

## When should I create a new component?

1. <b>When using code in multiple components.</b><br>As soon as you use the same code (or slight variations of it) multiple times, make a component out of it.
2. <b>When rendering entries of a collection.</b><br>If you render a collection, put the code for the entries (e.g. a teaser in a teaser list) in a separate component.
3. <b>When your component becomes too complex.</b><br>This is a rather vague rule, but as soon as you have the feeling that your component becomes too complex, move logical parts into their own component.

While the first rule is essential to avoid code duplication, the second and third rule are basically only for reducing the complexity of a component. In that case, I would call the components "sub components".

## Where should I put my sub components?

<b>In a directory in its parent component.</b> As you are not using these components anywhere else, you can "scope" them by putting them in a sub directory of the actual component. This couples them tightly together and you can find all the code where you expect it.

## What about components that are only used for templates?

Components, that are used by multiple templates and only by templates (e.g. header, footer, navigation), live in a subdirectory called `_includes/` in the `templates/` directory. I prefix the name of this directory with `_` to show that it is some sort of a helper directory and not a template.

## Example

The structure for an example project could look like this:

```
├── components
│   ├── button
│   ├── icon
│   ├── image
│   ├── input
│   └── video
│
├── content
│   ├── cta
│   ├── gallery
│   │   ├── thumbnails
│   │   │   └── thumbnail
│   │   └── view
│   ├── rte
│   └── teaser-list
│       └── teaser
│
└── templates
    ├── _includes
    │   ├── footer
    │   ├── header
    │   └── navigation
    ├── homepage
    ├── standard
    └── checkout
```

Again, this is nothing static and can be adapted for every project. Especially having a directory called `content` with components that can be picked by editors, makes of course only sense when there is actually a CMS behind the scenes.

If you are looking for a component library that plays well together with what I described in this post, feel free to check out <a href="https://github.com/mgrsskls/headman" rel="noopener">headman</a>. It is a small node module that can be used to develop your components in isolation, no matter how you organize them.
