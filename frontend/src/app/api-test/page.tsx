'use client';

import { useState } from 'react';

export default function ApiTest() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`);
      const data = await response.json();
      setTestResult({
        endpoint,
        status: response.status,
        data
      });
    } catch (error) {
      setTestResult({
        endpoint,
        error: error?.toString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={() => testAPI('/api/test')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Test API Basic
        </button>
        
        <button 
          onClick={() => testAPI('/api/v1/posts')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          Test API Posts
        </button>
        
        <button 
          onClick={() => testAPI('/api/debug-posts')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={loading}
        >
          Test Debug Posts
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="text-lg">Testing API...</div>
        </div>
      )}

      {testResult && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Test Result for: {testResult.endpoint}</h3>
          {testResult.error ? (
            <div className="text-red-600">
              <strong>Error:</strong> {testResult.error}
            </div>
          ) : (
            <>
              <div className="mb-2">
                <strong>Status:</strong> {testResult.status}
              </div>
              <div>
                <strong>Response:</strong>
                <pre className="bg-black text-green-400 p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="mt-6">
        <a href="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
