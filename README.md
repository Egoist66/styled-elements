This micro library will allow you to create customizable DOM elements in a convenient format, similar to styled components used in well-known JS frameworks. You will have the opportunity to style your components the way you want without going beyond the js file. So far there are 2 styling modes - Inline and Internal css. The project will continue to be improved and developed.

Examples: 

make a simple ES6 import and just use 


Here we create an "instance" of main Styled "class", its element() method returns a function, which returns a DOM string to use further. Plus this Component also takes a function to do more deep manipulations as it showed below. Component Header takes Component Nav and returns updated new structure. Similar to HOC or just HOF.

You see element() method takes params as object to inject styles. These very styles will be whether Inline or Internal depending on what value "isInlineCSS" takes - true or false. By default it is true. It may seem verbose but there is nothing much complicated. Also this method takes different params as Array [] and the last as String ''. Array takes attributes which may be used in your Component if you wish so. And the last parameter is selector which is used as className selector for CSS. Use it if you d like to style not by tag selector!




<pre>

    import {Styled} from "styled_dom"

    const Header = Styled.element({  @styles-object
        background: "red",
        color: "red",
        padding: '20px',
        border: '2px solid black',
        tag: 'header',
        isInlineCSS: false

    }, [ @attrs
        'class="header"',
        'data-category="header-3"'
    ], @selector 'header');


!!N.B - remove @styles-object, @attrs, @selector before use - These are params hints  

</pre>

<pre>
    const Nav = Styled.element({
    background: 'blue',
    padding: '10px',
    tag: 'nav',
    isInlineCSS: false
    }, ['class="nav"'], 'nav')
</pre>


<pre>

    const nodes = Styled.render(Header(Nav))
    Styled.mount(ref(nodes, 'header'), 'body')

</pre>


const {ref} = Styled 

Method ref() finds in vDOM node proper selector and parent which will mount it in real DOM 

<pre>
    const Footer = Styled.element({
        background: "red",
        color: "red",
        padding: '20px',
        border: '2px solid black',
        tag: 'footer',
        isInlineCSS: false

    }, [
        'class="footer"',
        'data-category="post"'
    ], 'footer');

</pre>

<pre>
    const footer = Styled.render(Footer(() => {
        return '<div>Hello footer</div>'
    }))
    console.log(footer)

    Styled.mount(ref(footer, 'footer'), 'body')

</pre>




Finally, you see there are also two important methods - render() and mount().
The main difference is that render() appends your created Elements in some kind of virtual copy of DOM through DOMParser API and all elements located there before to be appended in real DOM. Why? As you know, direct DOM handling through creating html strings, transforming and styling them - very resource-intensive operation. To minimize a little, all manipulations go in the "vDOM"

const nodes = Styled.render(Header(Nav)) - HOF

console.log(nodes) - log this node.


And method mount() - says "take that node dotted or the whole in vDOM and insert in real Document"


I hope you will like it.


Updates:

1.13.0 - There was added independent function "toFragment", which allows to do all standart operations out of real DOM structure to increase performance.

toFragment() method returns a function which can be used to return another node inside main one. If it's not necessary just pass "null". After, v_DOM is constructed you can take it and use usual DOM api to find proper elements with selectors and insert whereever you want or the whole vDOM

Examples: 

<pre>

    import {toFragment} from 'styled_dom'
 
    const vElement = toFragment('header')  
    const v_DOM = vElement(null) - null means, that "header" will be the only element in vDom

    console.log(v_DOM)

    const v_DOM_2 = vElement(() => {

        return 'p' - here it takes a callback to return another node inside itself
    
    })

    console.log(v_DOM_2)


    vDOM as well as real DOM works with all DOM api methods (append, prepend, etc)

</pre>


