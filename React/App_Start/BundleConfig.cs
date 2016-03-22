using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace React
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new BabelBundle("~/bundles/main").Include(
                "~/Scripts/react.min.js",
                "~/Scripts/react-dom.min.js",
                "~/Scripts/showdown.js",
                "~/Scripts/Tutorial.jsx"
                ));
        }
    }
}
