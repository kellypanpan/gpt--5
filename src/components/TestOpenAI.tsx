import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Zap } from "lucide-react";
import { useWriter } from "@/hooks/useAPI";
import { useAuthState } from "@/lib/clerk";
import { useTestOpenAI } from "@/hooks/useTestAPI";

export function TestOpenAI() {
  const [testPrompt, setTestPrompt] = useState("Write a short hello message");
  const { isSignedIn } = useAuthState();
  const { data, loading, error, generateContent } = useWriter();
  const { result: testResult, loading: testLoading, testConnection } = useTestOpenAI();

  const handleAPITest = async () => {
    try {
      await testConnection();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleWriterTest = async () => {
    if (!testPrompt.trim()) {
      setTestPrompt("Write a short hello message");
    }

    try {
      await generateContent({
        prompt: testPrompt,
        tone: "casual",
        length: "short",
        type: "blog"
      });
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          OpenAI API 连接测试
          {(testResult?.success || data?.content) && <CheckCircle className="h-5 w-5 text-green-500" />}
          {(testResult?.error || error) && <XCircle className="h-5 w-5 text-red-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 认证状态 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">认证状态:</span>
          <Badge variant={isSignedIn ? "default" : "secondary"}>
            {isSignedIn ? "已登录" : "未登录"}
          </Badge>
        </div>

        {/* API 连接测试 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">步骤 1: 测试 API 连接</label>
          <Button 
            onClick={handleAPITest}
            disabled={testLoading}
            variant="outline"
            className="w-full"
          >
            {testLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                测试连接中...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                测试 OpenAI API 连接
              </>
            )}
          </Button>
        </div>

        {/* API 测试结果 */}
        {testResult && (
          <div className="space-y-2">
            <div className={`border rounded-lg p-3 text-sm ${
              testResult.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="font-medium">
                {testResult.success ? '✅ API 连接成功' : '❌ API 连接失败'}
              </div>
              <div className="text-xs mt-1">{testResult.message}</div>
              {testResult.data && (
                <div className="text-xs mt-2 opacity-75">
                  测试时间: {new Date(testResult.data.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Writer 功能测试 */}
        {testResult?.success && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">步骤 2: 测试文本生成功能</label>
              <Textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="输入测试提示词..."
                className="min-h-[60px]"
              />
            </div>

            <Button 
              onClick={handleWriterTest}
              disabled={loading || !isSignedIn}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                "测试文本生成"
              )}
            </Button>
          </>
        )}

        {/* 结果显示 */}
        {data?.content && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-green-600">✅ 测试成功!</label>
              <Badge variant="outline">消耗 {data.creditsUsed} 积分</Badge>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              {data.content}
            </div>
          </div>
        )}

        {/* 错误显示 */}
        {error && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-600">❌ 测试失败</label>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <p className="font-medium mb-1">使用说明:</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>请先登录Clerk账户</li>
            <li>输入测试提示词并点击测试</li>
            <li>成功则说明OpenAI API配置正确</li>
            <li>失败请检查API密钥和网络连接</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}