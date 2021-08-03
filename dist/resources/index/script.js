(() => {
  // src/utils/data.js
  var data = {
    a\u00F1o: 2021
  };

  // src/views/Index/script.js
  console.log("In Index: ", data);

  // src/views/Index/index.jsx
  var IndexView = () => {
    return /* @__PURE__ */ React.createElement("div", {
      id: "home"
    }, /* @__PURE__ */ React.createElement("h1", null, " Index! RA"));
  };

  // src/pages/index.jsx
  var IndexPage = (props) => /* @__PURE__ */ React.createElement(IndexView, {
    ...props
  });
  var getStaticProps = () => {
    return {
      data: {
        title: "Darwin - Inicio"
      }
    };
  };
  var pages_default = IndexPage;
})();
