// git 地址  https://codetower.github.io/es6-features/?utm_campaign=read_more&utm_medium=email&utm_source=mybridge

// 总的配置方法
function selectFun(type) {
    switch (type) {
        case "jiantou":
            return get_jian_tou();
        case "some_class":
            return get_some_class();
        case "let":
            return get_let_fun();
        case "for_of":
            return get_for_of();
        case "proxy": 
            return get_proxy();
        default:
            return false;
    }
}

selectFun("proxy");

// 代理可用于改变对象的行为。它们允许我们定义陷阱。
function get_proxy() {
    var obj = function ProfanityGenerator() {
        return {
           words: "Horrible words"    
        }
    }()
    
    var handler = function CensoringHandler() {
        return {
            get: function (target, key) {
                return target[key].replace("Horrible", "Nice");
            },
        }
    }()
    
    var proxy = new Proxy(obj, handler);
    
    console.log(proxy.words);
}


// For..of （for..of返回时每一项item, for...in 返回下标index）
function get_for_of() {
    let arr = [33,44,55];
    for(let i in arr){
        console.log("for_in:", i); 
    };
    for(let k of arr) {
        console.log("for_of:", k);
    }
}


// let 使用比较容易错误的地方
function get_let_fun() {
    let me = "go";  // globally scoped
    var i = "able"; // globally scoped

    console.log(window.me); // undefind
    console.log(window.i); // undefind
}


// class 类的使用
function get_new_class() {
    class SkinnedMesh extends THREE.Mesh {
        constructor(geometry, materials) {
          super(geometry, materials);
      
          this.idMatrix = SkinnedMesh.defaultMatrix();
          this.bones = [];
          this.boneMatrices = [];
          //...
        }
        update(camera) {
          //...
          super.update();
        }
        get boneCount() {
          return this.bones.length;
        }
        set matrixType(matrixType) {
          this.idMatrix = SkinnedMesh[matrixType]();
        }
        static defaultMatrix() {
          return new THREE.Matrix4();
        }
      }
}

// 箭头函数功能，箭头函数this的指向。（因此我们可以看出箭头符号指向的是调用者，谁调用指向谁this）
function get_jian_tou() {
    var object = {
        name: "Name", 
        arrowGetName: () => this.name,
        regularGetName: function() { return this.name },
        arrowGetThis: () => this,
        regularGetThis: function() { return this }
    }
    
    console.log(this.name) // 空
    console.log(object.arrowGetName()); // 空
    console.log(object.arrowGetThis()); // window
    console.log(this) // window
    console.log(object.regularGetName()); // "Name"
    console.log(object.regularGetThis()); // object 对象
}

// this 的指向问题，指向调用者
function get_some_class() {
    class someClass {
        constructor() {
            this.name = "Name"
        }

        testRegular() {
            return function () { return this }

        }

        testArrow() {
            return () => this.name;
        }
    }

    var obj = new someClass();

    console.log("someClass 类下name值：", obj.name)
    console.log("someClass 类的方法中的方法的this指向：", obj.testRegular()());
    console.log("someClass 箭头符号指向被调用者，所以这个this指向的是这个类方法：", obj.testArrow()());
}

