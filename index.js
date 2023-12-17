const toFragment = (tag = null) => {
  return (fn) => {
    const vDom = document.createDocumentFragment();
    const vElement = document.createElement(tag ?? "div");
    vDom.append(vElement);

    if (fn === null) {
      return vDom;
    } else {
      vElement.append(document.createElement(fn()));
      return vDom;
    }
  };
};

class _Node {
  static restrictProps(obj, props) {
    Object.defineProperties(obj, props());
  }
}

class Elements extends _Node {
  static element(options, props, selector = null) {
    this.restrictProps(options, () => {
      return {
        tag: { writable: true, enumerable: false },
        isInlineCSS: { writable: true, enumerable: false },
      };
    });

    const styleStr = Object.entries(options)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");

    return (insert = () => "") => {
      return `    
                <${options.tag ?? "div"} ${[...props].join(" ")} >
                          ${insert()}
                            
                  ${this.style(options, styleStr.trim(), selector)}
     
                </${options.tag ?? "div"}>
                
            
            `.trim();
    };
  }

  static style(options, styles, selector) {
    switch (options?.isInlineCSS) {
      case true:
        return `
              
                      <style>
                      
                           ${options.tag}{
                              ${styles}
                           }
                      
                     </style>
              
                  `;
      case false:
        return `
            
                      <style>
                      
                         
                          
                          .${selector}{
                              ${styles}
                          }
                          
                      </style>
        
                  `;
      default:
        return `
              
                      <style>
                      
                           ${options.tag}{
                              ${styles}
                           }
                      
                     </style>
              
                  `;
    }
  }
}

class Styled extends Elements {
  static isStyledComponent = true;

  static render(elements) {
    const vDom = new DOMParser();
    return vDom.parseFromString(elements, "text/html");
  }

  static ref(node, find) {
    if (node.querySelectorAll(find).length > 1) {
      const elems = [...node.querySelectorAll(find)];
      return elems;
    } else {
      const elem = node.querySelector(find);
      return elem;
    }
  }

  static mount(element, parent) {
    return document.querySelector(parent).append(element);
  }
}

export { Styled, Elements, toFragment };
