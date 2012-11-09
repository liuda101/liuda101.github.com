---
layout: post
title: 层叠样式表之“层叠”
firstLetter : 层
---
<p>
	CSS（Cascading Style Sheets），翻译成中文是层叠样式表。那么，“层叠”的意思到底是什么呢？其实说简单点儿，就是叠加，一层一层的叠加。那么，这里的叠加有几种呢？共有三种层次叠加：
</p>
<ol>
	<li>用户样式、代理样式、创造人员样式之间的叠加</li>
	<li>继承属性的叠加</li>
	<li>多选择器属性的叠加</li>
</ol>
<p>
	<span class="b">
	用户样式(Reader Style)、代理样式(Agent Style)、创造人员样式(Author Style)之间的叠加。
	</span>
</p>
<p>
	关于这三种样式，在<a target="_blank" href="http://stackoverflow.com/questions/7022344/css-newbie-questions-on-authors-style-readers-style-agents-style">CSS Newbie:questions on author's style,reader's style,agent's style</a>
	这里有比较详尽的解释。在这里只做一个总结：创造人员样式指的是通过link或者直接写入等方法添加上的样式，与文档直接关联；用户样式指的是，用户通过浏览器提供的自定义样式添加上的样式；代理样式指的是
	浏览器自身的默认样式。这三者之间的权重关系，通常是这样的：Author Style > Reader Style > Agent Style。但是也有一个例外：当Author Style和Reader Style的CSS属性值加有<span class="b">!important</span>
	的时候，Reader Style是大于Author Style的。这个看上去有些奇怪，其实是非常合理的。比如，老年人需要将字体调大，可以通过自定义样式（也就是Reader Style）来达到这个目的。如果没有这条“奇怪”的规则，将难以实现。
</p>