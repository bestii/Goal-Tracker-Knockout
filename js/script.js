// To highlight the row when checkbox is clicked
$('#goalTable').on('click','.test', function() {
  $(this).parent().parent().toggleClass("highlight")
});

$( document ).ready(function() {
    function ViewModel(){
        var self=this;
        self.data = ko.observableArray([
          { "name": "Javascript","type": "Type 1", "deadline": "2016-08-12" },
          { "name": "Bootstrap","type": "Type 4","deadline": "2016-08-01"},
          { "name": "Ajax","type": "Type 3","deadline": "2016-08-04"}
        ]);

        self.name = ko.observable();
        self.type = ko.observable();
        self.deadline = ko.observable();

        self.selectedItems = ko.observableArray();

        self.addGoal=function(){
          self.data.push({ "name": self.name(),"type": self.type(),"deadline": self.deadline()});
          self.name("");
          self.type("");
          self.deadline("");

        }
        self.deleteGoal=function(){
          //self.data.removeAll(self.selectedItems());
          //self.selectedItems.removeAll();
          console.log(self.selectedItems());
        }
    };

    ko.applyBindings(new ViewModel());


});
