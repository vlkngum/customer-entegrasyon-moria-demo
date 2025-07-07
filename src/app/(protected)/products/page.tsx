import ProductListTable from "@/components/products/list/ProductListTable";
import ProductList from "@/components/products/list/ProductList"; 

export default function Products(){ 
    return(
        <div className="p-4"> 
            <ProductListTable />
            <ProductList /> 
        </div>
    );
}