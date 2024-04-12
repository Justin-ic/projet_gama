@using Syncfusion.EJ2
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>@ViewBag.Title - My ASP.NET Application</title>
        <!-- Syncfusion Essential JS 2 Styles -->
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css" rel="stylesheet" />

        <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css" />

        <!-- Syncfusion Essential JS 2 Scripts -->
        <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
        @Styles.Render("~/Content/css")
        @Scripts.Render("~/bundles/modernizr")
    </head>
    <body>
        <div class="header-section dock-menu" id="header">
            <ul class="header-list">
                <li id="hamburger" class="icon-menu icon list" (click)="toggle()"></li>
                <input type="text" placeholder="Search..." class="search-icon list">
                <li class="right-header list">
                    <div class="horizontal-menu">
                        <!-- menu element declaration-->
                        @Html.EJS().Menu("horizontal-menubar").Items(ViewBag.AccountMenuItems).CssClass("dock-menu").Render()
                    </div>
                </li>
                <li class="right-header list support">Support</li>
                <li class="right-header list tour">Tour</li>
            </ul>
        </div>
        <!-- sidebar element declaration-->
        @{Html.EJS().Sidebar("sidebar-menu").Width("220px").Target(".main-content").EnableDock(true).DockSize("50px").ContentTemplate(@<div class="dock-menu">
        <!-- normal state element declaration -->
        <div class="main-menu">
            <p class="main-menu-header">MAIN</p>
            <div>
                <!-- menu element declaration-->
                @Html.EJS().Menu("main-menubar").Items(ViewBag.mainMenuItems).Orientation(Syncfusion.EJ2.Navigations.Orientation.Vertical).CssClass("dock-menu").Render()
            </div>
        </div>
        <div class="action">
            <p class="main-menu-header">ACTION</p>
            <button class="e-btn action-btn" id="action-button">+ Button</button>
        </div>
        <!-- end of normal state element declaration -->
    </div>).Render();}
        <div id="maintext" class="main-content">
            <div>
                @RenderBody()
            </div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                sidebarInstance = document.getElementById("sidebar-menu").ej2_instances[0];
                // Expand the Sidebar
                document.getElementById('hamburger').addEventListener('click', function () {
                    sidebarInstance.toggle();
                });

            });
        </script>
        @Html.EJS().ScriptManager()
        @Scripts.Render("~/bundles/jquery")
        @Scripts.Render("~/bundles/bootstrap")
        @RenderSection("scripts", required: false)


        <style>
             /* header-section styles */
            #header.header-section,
            #header .search-icon {
                height: 50px;
            }

            #hamburger.icon-menu {
                font-size: 24px;
                float: left;
                line-height: 50px;
                padding-top:8px;
            }

            #header .right-header {
                height: 35px;
                padding: 7px;
                float: right;
            }

            #header .list {
                list-style: none;
                cursor: pointer;
                font-size: 16px;
                line-height: 35px;
            }

            #header .header-list {
                padding-left: 15px;
                margin: 0;
            }

            @@media(max-width:500px) {
                #header .right-header.list.support,
                #header .right-header.list.tour {
                    display: none;
                }
            }

            /* text input styles */
            #header .search-icon {
                float: left;
                padding-left: 15px;
                border: 0px solid #33383e !important;
                background-color: #33383e;
                cursor: text;
                width: 5em;
            }

                #header .search-icon:focus {
                    outline: none;
                    cursor: default;
                }

            /* end of text input styles */
            /* end of header-section styles */

            /* content area styles */
            #maintext.main-content {
                height: 100vh;
                z-index: 1000;
            }

            #maintext .content {
                margin-top: 230px;
                text-align: center;
                font-size: 32px;
                color: #1784c7;
            }

            /* end of content area styles */

            /* menu styles */
            /* horizontal-menu styles */
            #header .header-list .horizontal-menu .e-menu-item {
                height: 35px;
                vertical-align: middle;
                font-size: 16px;
                line-height: 35px;
            }

            #header .e-menu-item .e-caret {
                line-height: 35px;
            }

            /* end of horizontal-menu styles */
            /* vertical-menu styles */

            #sidebar-menu .e-menu-wrapper ul .e-menu-item.e-menu-caret-icon {
                width: 220px;
            }

            #sidebar-menu .e-menu-wrapper ul .e-menu-item:hover, .e-menu-item.e-focused:hover {
                background-color: #3e454c !important;
            }

            /* end of vertical-menu styles */
            /* end of menu styles */

            /* Sidebar styles */
            /* docksidebar styles */
            .dock-menu .e-menu-wrapper ul .e-menu-item .e-caret,
            #header .search-icon,
            #sidebar-menu .action-btn,
            #header .e-menu-item .e-caret,
            .dock-menu .e-menu-wrapper ul .e-menu-item {
                color: #fff !important;
            }

            .dock-menu.e-close .e-menu-wrapper ul .e-menu-item {
                width: 50px;
            }

            .dock-menu.e-close ul .e-menu-item.e-menu-caret-icon {
                padding-right: 12px;
            }

            #sidebar-menu.e-dock.e-close .e-menu-wrapper ul .e-menu-item .e-caret,
            #sidebar-menu.e-dock.e-close .main-menu-header,
            #sidebar-menu.e-dock.e-close .action-btn {
                display: none;
            }

            #sidebar-menu.e-dock.e-close .e-menu-wrapper ul .e-menu-item.e-menu-caret-icon,
            #sidebar-menu.e-dock.e-close .e-menu-wrapper ul.e-vertical {
                min-width: 0;
                width: 50px !important;
            }

            #sidebar-menu.e-dock.e-close .e-menu-wrapper ul.e-menu {
                font-size: 0;
            }

            #sidebar-menu.e-dock.e-close .e-menu-item .e-menu-icon {
                font-size: 20px;
                padding: 0;
            }

            #sidebar-menu,
            #sidebar-menu ul,
            #header ul,
            .dock-menu .e-menu-wrapper,
            .dock-menu.e-menu-wrapper,
            .dock-menu.e-menu-wrapper ul > *,
            .dock-menu .e-menu-wrapper ul > * {
                background-color: #33383e !important;
                color: #fff !important;
                overflow: hidden;
            }

                /* end of docksidebar styles */
                /*end of  Sidebar styles */

                /*main-menu-header  styles */
                #sidebar-menu .main-menu-header {
                    padding: 4px 0px 0px 18px;
                    color: #656a70;
                }

                /*end of main-menu-header  styles */

                /*button styles */
                #sidebar-menu .action-btn {
                    margin-left: 16px;
                    width: 165px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 5px;
                }

                #sidebar-menu .action-btn {
                    background-color: #1784c7;
                }
            /* custom code start */
            /*end of button styles */

            .col-md-12, body {
                padding: 0;
            }

            #sidebar-menu {
                margin-left: -1px;
            }
            /*body styles */
            /* custom code end */
            /*end of body styles */

            /*icon styles */
            @@font-face {
                font-family: 'fontello';
                src: url('data:application/octet-stream;base64,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') format('truetype');
            }

            #sidebar-menu .icon-up-hand:before {
                content: '\e801';
            }

            #sidebar-menu .icon-bell-alt:before {
                content: '\e802';
            }

            #sidebar-menu .icon-user:before {
                content: '\e803';
            }

            #sidebar-menu .icon-picture:before {
                content: '\e804';
            }

            #sidebar-menu .icon-comment-alt:before {
                content: '\e805';
            }

            #sidebar-menu .icon-tag:before {
                content: '\e806';
            }

            #sidebar-menu .icon-comment-inv-alt2:before {
                content: '\e807';
            }

            #sidebar-menu .icon-eye:before {
                content: '\e808';
            }

            #sidebar-menu .icon-globe:before {
                content: '\e809';
            }

            #sidebar-menu .icon-bookmark-empty:before {
                content: '\e810';
            }

            #sidebar-menu .icon-bookmark:before {
                content: '\e811';
            }

            #header .icon-menu:before {
                content: '\e812';
            }

            #sidebar-menu .icon,
            #header #hamburger.icon-menu {
                font-family: 'fontello';
            }

            #sidebar-menu .e-menu-icon::before {
                color: #656a70;
            }

            /*icon styles */
        </style>
    </body>
</html>