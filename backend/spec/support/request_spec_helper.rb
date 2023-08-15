module RequestSpecHelper
  def json_headers
    { 'Content-Type' => 'application/json'}
  end

  def json
    JSON.parse(response.body)
  end
end