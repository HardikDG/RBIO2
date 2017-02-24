import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,ActionSheetController,AlertController,ToastController } from 'ionic-angular';
import { FormGroup, FormControl,Validators,FormArray } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode = "New";
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public actionSheetCtrl: ActionSheetController, private alertCtrl:AlertController, 
  private toastCtrl:ToastController) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium',Validators.required),
      'ingredients':new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title:'Add Ingredient',
      inputs:[{
        name:'name',
        placeholder: 'Name'
      }],
      buttons:[
        {
          text:'Cancel',
          role:'Cancel'
      },
      {
        text: 'Add',
        handler: data => {
          if(data.name.trim() == '' || data.name == null){
            const toast = this.toastCtrl.create({
              message: 'Please enter a valid value',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
            return;
          }

          (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name,Validators.required))
          const toast = this.toastCtrl.create({
              message: 'Item Added',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
        }
      }
      ]
    })
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
     title: 'What do you want to do?',
     buttons: [
       {
         text: 'Add ingredients',
         handler: () => {
           this.createNewIngredientAlert().present();
         }
       },
       {
         text: 'Remove all ingredients',
         role: 'destructive',
         handler: () => {
            const formElementArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formElementArray.length;
            if (len > 0){
              for(let i = len - 1;  i>= 0;  i--){
                  formElementArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
              message: 'All items are deleted',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
            }
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
  }

}
