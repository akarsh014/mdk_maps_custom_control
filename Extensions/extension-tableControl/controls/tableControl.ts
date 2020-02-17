import * as app from 'tns-core-modules/application';
import { IControl } from './controls/IControl';
import { IView } from './IView';
import { BaseObservable } from './observables/BaseObservable';

export class myTableControl extends IControl {
	
	private _tableView: any;
    private _tableRow1: any;
    //private _tableRow2: any;
    //private _tableRow3: any;
    //private _tableRow4: any;
    //private _labelSKU: any;
    private _skuValue: any;
    //private _labelDOC_Qty: any;
    private _docQty: any
    //private _labelSCAN_Qty: any;
    private _scanQty: any;
    private _minusButton: any;
    private _plusButton: any;
     private _observable: BaseObservable;
     
    public initialize(props) {
        super.initialize(props);
        if (app.android) {
            this._tableView = new android.widget.TableLayout(this.androidContext());
            //this._tableView.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
            this._tableRow1 = new android.widget.TableRow(this.androidContext());
            //this._tableRow2 = new android.widget.TableRow(this.androidContext());
            this._skuValue = new android.widget.TextView(this.androidContext());
            this._skuValue.setText("00010119050");
            this._docQty = new android.widget.TextView(this.androidContext());
            this._docQty.setText("9876543210");
            this._scanQty = new android.widget.TextView(this.androidContext());
            this._scanQty.setText("0");
            this._minusButton = new android.widget.Button(this.androidContext());
            this._minusButton.setText("-");
            //this._minusButton.setLayoutParams(new android.widget.LinearLayout.LayoutParams(10, 100));
            this._plusButton = new android.widget.Button(this.androidContext());
            //this._plusButton.setLayoutParams(new android.widget.LinearLayout.LayoutParams(10, 100));
            this._plusButton.setText("+");

            this._tableRow1.addView(this._skuValue);
            this._tableRow1.addView(this._docQty);
            this._tableRow1.addView(this._scanQty);
            this._tableRow1.addView(this._minusButton);
            this._tableRow1.addView(this._plusButton);

            this._tableView.addView(this._tableRow1);
        }
    }
    public view() {
        if (app.android) {
            //this._tableView.addView(this._tableRow1.new android.widget.TableLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
            //this._tableView.addView(this._tableRow2.new android.widget.TableLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
            return this._tableView;
        }
    }
	public viewIsNative() {
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        // do nothing
        return Promise.resolve();
    }
}