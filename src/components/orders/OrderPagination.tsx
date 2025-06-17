export default function OrderPagination() {
  return (
    <div className="panel  flex items-center justify-between text-sm text-gray-600">
      <div>
        Toplam 0 sayfada
        <select className="mx-2 border border-gray-300 rounded-md px-2 py-1">
          <option>1</option>
        </select>
        sayfadasınız.
      </div>
      <div>
        Her sayfada
        <select className="mx-2 border border-gray-300 rounded-md px-2 py-1">
          <option>20</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>
        kayıt göster.
      </div>
    </div>
  );
} 