import { supabase } from '@/lib/supabase';

export const TestSupabaseConnection = () => {
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase.auth.getUser();
      console.log('Current user:', data.user);
      console.log('Auth error:', error);
      
      // Test OAuth providers
      const { data: session } = await supabase.auth.getSession();
      console.log('Current session:', session);
      
      alert('Supabase connection test completed. Check console for details.');
      
    } catch (error) {
      console.error('Supabase test error:', error);
      alert('Supabase connection failed: ' + error);
    }
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="font-bold text-yellow-800">Supabase 连接测试</h3>
      <p className="text-yellow-700 text-sm mb-2">点击测试Supabase配置是否正常</p>
      <button 
        onClick={testConnection}
        className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700"
      >
        测试连接
      </button>
    </div>
  );
};