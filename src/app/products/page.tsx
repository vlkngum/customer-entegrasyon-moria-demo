import ProductListTable from "@/components/products/ProductListTable";
import ProductList from "@/components/products/ProductList";

export default function Products(){
    return(
        <div className="p-4">
            <ProductListTable />
            <ProductList />
        </div>
    );
}