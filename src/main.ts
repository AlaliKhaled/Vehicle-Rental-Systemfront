import './style.css'

// تحديد المكان الذي سنعرض فيه البيانات في صفحة HTML
const app = document.querySelector<HTMLDivElement>('#app')!

// تصميم الهيكل الأساسي للصفحة
app.innerHTML = `
  <div style="padding: 20px; font-family: Arial, sans-serif; direction: rtl;">
    <h1 style="color: #2c3e50;">🚗 نظام MKZ لتأجير المركبات</h1>
    <h2>المركبات المتاحة:</h2>
    <div id="vehicles-container" style="font-size: 18px; color: #666;">
      جاري تحميل البيانات من السيرفر... ⏳
    </div>
  </div>
`

// دالة لجلب البيانات من خادم Render
const fetchVehicles = async () => {
  try {
    // جلب الرابط من ملف .env
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("Connecting to:", apiUrl);
    
    // طلب البيانات من مسار المركبات
    const response = await fetch(`${apiUrl}/vehicles/`);
    const data = await response.json();
    
    // التعامل مع تنسيق الـ Pagination في DRF
    const vehicles = data.results || data;
    
    // تسجيل البيانات للتصحيح
    console.log('Response:', data);
    console.log('Vehicles:', vehicles);
    
    const container = document.getElementById('vehicles-container')!;
    
    // عرض البيانات إذا كانت موجودة
    if (vehicles.length > 0) {
      let html = '<div style="display: flex; gap: 20px; flex-wrap: wrap;">';
      vehicles.forEach((vehicle: any) => {
        html += `
          <div style="border: 1px solid #ddd; padding: 20px; border-radius: 12px; background: #f9f9f9; width: 300px;">
            <pre style="direction: ltr; text-align: left; overflow-x: auto;">${JSON.stringify(vehicle, null, 2)}</pre>
          </div>
        `;
      });
      html += '</div>';
      container.innerHTML = html;
    } else {
      container.innerHTML = '<p>لا توجد مركبات حالياً.</p>';
    }
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
    document.getElementById('vehicles-container')!.innerHTML = '<p style="color: red;">حدث خطأ أثناء الاتصال بالسيرفر ❌</p>';
  }
}

// تشغيل الدالة
fetchVehicles()