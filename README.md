# 10th Commit - DataRefresh Module
1. Using Selenium Browser Automation.
2. Download The Latest Product Pricing Details & save the product pojo list in Json file.

# 9th Commit - Smooth Scrollbars Added.
1. Added Scrollbar in Product-List component:
   ```
   <div id="idProductListContainer">
       <cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
         <div *cdkVirtualFor="let product of (productList | productListFilterPipe:strSearch)"
              class="">
           <app-product-item [productModel]="product"></app-product-item>
         </div>
       </cdk-virtual-scroll-viewport>
     </div>
   ```
2. Installed cdk module for smooth scrolling -> `npm i @angular/cdk --save`
3. Removed nav-header component from display.
4. Updated Components CSS for adjusting height & scrollbar: <br>
   a. Order
   b. Order-Summary
   c. Product-Search -> Rounded input & clear btn along with m-1 margin. 
5. Added CSS Properties for order-cart component.
   ```css
       #idOrderCartContainer {
         max-height: 75vh;
         /*height: auto;*/
         overflow: auto;
       }
   ```

# 8th Commit - Updated Products List
1. Stub Product List with 781 products.
2. Need to add scrollbar in productList to avoid the delay caused by rendering huge data.

# 7th Commit - Updated Order-Summary Component
1. Updated Order-Summary Component to be in Sync with Order Cart.  
2. Updated resetQty method in Product-Item Component & Cart-Product-Item Component.
   Store & pass qty to cartUpdated() for the product before resetting it to 0 so that Order-Summary could be updated accordingly. 
3. Removed 'Search' Btn from Product-Search Component

# 6th Commit - Updated Order-Qty, Order-Cart Component & Product-Item Component
1. Fixed X Btn. of Order-Qty Component
2. Updated HTML Template Structure of Order-Cart Component & Product-Item Component.

# 5th Commit - Updated Order Cart Component
1. Order Cart updated & is in Sync with whatever products added / removed. 
   Order Cart Component's cartProductList is in Sync with the Product-List Component's cartProductList.
2. Components Added -> app-order-qty, app-cart-product-item
3. Moved out Qty [Add, -, +] feature to separate component (app-order-qty)
   which is used by app-product-item & app-cart-product-item

# 4th Commit - Added Product Qty
1. Product Qty Manipulation via Add, -, + buttons.

# 3rd Commit - Added Search Filter Criteria
1. Product Search Feature -> Filtering the products based on the input criteria.
2. Added Angular Pipe 'ProductListFilterPipe' for filtering the search results.


# 2nd Commit - Added Empty Component Skeleton Structure
Components Structure:
Nav-Header
Order
    Order-Cart
    Order-Product
        Product-Category
        Product-Search
            Product-List
                Product-Item 

# Init Commit - 'Modikare' Project from Scratch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.
