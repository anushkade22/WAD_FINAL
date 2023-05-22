import webapp2
class MainPage(webapp2.RequestHandler) :
	def get(self):
		self.response.headers["Content-Type"]="text/plain"
		cnt=0
		while cnt<=10:
			self.response.out.write("Harsh\n")
			cnt+=1
app=webapp2.WSGIApplication([('/',MainPage)],debug=True)
