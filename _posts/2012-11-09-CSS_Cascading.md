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
	<li>多选择器（同一来源）属性的叠加</li>
	<li>继承属性的叠加</li>
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
<p>
	<span class="b">
		多种选择器（同一来源）属性的叠加。
	</span>
</p>
<p>
	这个是非常容易理解的。比如，body h1{}和h1{}，同时选择到了h1元素，那么如果他们的属性值有冲突，肯定采用body h1{}的属性值。这里有一个“权重”的问题。具体来说就是：内敛属性为1000，id选择器属性为100，class选择器属性为10，
	标签选择器、伪类元素、属性选择器等为1，通配符和结合符号（如+、>等为0.当然，这些都要服从于<span class="b">!important</span>。
</p>
<p>
	这里需要指明的是，如果权重一样，来源一样，那么，则会按照顺序来排序，后来的权重更高。所以，在写a:link,a:visited,a:hover,a:active的时候，应该按照特定的顺序来。因为其权重是一样的，所以后面的会覆盖掉前面的。
</p>
<p>
	<span class="b">
		继承属性的叠加。
	</span>
</p>
<p>
	有很多属性值是可以继承的，比如color等。继承值根本没有权重，这与“0”是有区别的！例如：
</p>
<p>
	*{color:blue;}<br />
	p{color:red;}<br />
	<br />
	<p>红色<span>红色</span></p>
</p>
<p>
	在这里，span元素的颜色可以继承自p，应该为红色；但是通配符已经设置了蓝色。而虽然通配符对权重的贡献为0，但还是比根本没有权重的继承值要高的。
</p>
<p>
	<span class="b">最后总结，权重的由大到小的顺序依次为：</span>
	<ol>
		<li>用户样式即Reader Style : !important</li>
		<li>作者样式即Author Style : !important</li>
		<li>作者样式即Author Style，按照权重计算法来计算</li>
		<li>用户样式即Reader Style</li>
		<li>代理样式Agent Style</li>
	</ol>
</p>